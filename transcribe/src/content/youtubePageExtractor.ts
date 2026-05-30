import { getCurrentVideoInfo, isYouTubeWatchUrl } from "../core/youtubePageInfo";
import type {
  CaptionTrack,
  ExtractPageDataResponse,
  FetchCaptionRequest,
  FetchCaptionResponse,
  FetchInnertubeCaptionRequest,
  FetchTranscriptPanelResponse,
  MarkdownFormat,
  StoredSttResult,
  TriggerCaptionRequest,
  TranscriptPayload,
  TranscriptSegment
} from "../types/transcript";

const REQUEST_TYPE = "TRANSCRIBE_EXTRACT_PAGE_DATA";
const FETCH_CAPTION_TYPE = "TRANSCRIBE_FETCH_CAPTION_TRACK";
const FETCH_TRANSCRIPT_PANEL_TYPE = "TRANSCRIBE_FETCH_TRANSCRIPT_PANEL";
const FETCH_INNERTUBE_CAPTION_TYPE = "TRANSCRIBE_FETCH_INNERTUBE_CAPTION";
const TRIGGER_CAPTION_TYPE = "TRANSCRIBE_TRIGGER_CAPTION_PLAYBACK";
const TOGGLE_PANEL_TYPE = "TRANSCRIBE_TOGGLE_PANEL";
const STORAGE_GEMINI_API_KEY = "geminiApiKey";
const STORAGE_OPENAI_API_KEY = "openaiApiKey";
const STORAGE_STT_PROVIDER = "sttProvider";

let panelRoot: HTMLDivElement | null = null;
let panelStatusTimer: number | null = null;
let lastRenderedSttResultId: string | null = null;
let panelMarkdown = "";

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (!isExtractPageDataMessage(message)) {
    if (isTogglePanelMessage(message)) {
      void togglePanel();
      sendResponse({ ok: true, data: true });
      return false;
    }

    if (isFetchCaptionMessage(message)) {
      void fetchCaptionTrackFromPage(message.track)
        .then((data) => {
          sendResponse({ ok: true, data });
        })
        .catch((error) => {
          sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
        });

      return true;
    }

    if (isFetchTranscriptPanelMessage(message)) {
      void fetchTranscriptPanelFromPage()
        .then((data) => {
          sendResponse({ ok: true, data });
        })
        .catch((error) => {
          sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
        });

      return true;
    }

    if (isFetchInnertubeCaptionMessage(message)) {
      void fetchInnertubeCaptionFromPage(message)
        .then((data) => {
          sendResponse({ ok: true, data });
        })
        .catch((error) => {
          sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) });
        });

      return true;
    }

    if (isTriggerCaptionMessage(message)) {
      triggerCaptionPlayback(message);
      sendResponse({ ok: true, data: true });
      return false;
    }

    return false;
  }

  try {
    if (!isYouTubeWatchUrl(location.href)) {
      throw new Error("請先打開 YouTube 影片頁。");
    }

    const response: ExtractPageDataResponse = {
      video: getCurrentVideoInfo(),
      playerResponse: extractPlayerResponseFromScripts()
    };

    sendResponse({ ok: true, data: response });
  } catch (error) {
    sendResponse({
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }

  return false;
});

function isExtractPageDataMessage(message: unknown): message is { type: typeof REQUEST_TYPE } {
  return typeof message === "object" && message !== null && (message as { type?: unknown }).type === REQUEST_TYPE;
}

function isTogglePanelMessage(message: unknown): message is { type: typeof TOGGLE_PANEL_TYPE } {
  return typeof message === "object" && message !== null && (message as { type?: unknown }).type === TOGGLE_PANEL_TYPE;
}

function isFetchCaptionMessage(message: unknown): message is { type: typeof FETCH_CAPTION_TYPE } & FetchCaptionRequest {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as { type?: unknown }).type === FETCH_CAPTION_TYPE &&
    typeof (message as { track?: { baseUrl?: unknown } }).track?.baseUrl === "string"
  );
}

function isFetchTranscriptPanelMessage(message: unknown): message is { type: typeof FETCH_TRANSCRIPT_PANEL_TYPE } {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as { type?: unknown }).type === FETCH_TRANSCRIPT_PANEL_TYPE
  );
}

function isFetchInnertubeCaptionMessage(
  message: unknown
): message is { type: typeof FETCH_INNERTUBE_CAPTION_TYPE } & FetchInnertubeCaptionRequest {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as { type?: unknown }).type === FETCH_INNERTUBE_CAPTION_TYPE &&
    typeof (message as { videoId?: unknown }).videoId === "string"
  );
}

function isTriggerCaptionMessage(message: unknown): message is { type: typeof TRIGGER_CAPTION_TYPE } & TriggerCaptionRequest {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as { type?: unknown }).type === TRIGGER_CAPTION_TYPE
  );
}

function triggerCaptionPlayback(request: TriggerCaptionRequest): void {
  const moviePlayer = document.querySelector("#movie_player") as
    | (Element & {
        setOption?: (module: string, option: string, value: unknown) => void;
        loadModule?: (module: string) => void;
        setOptionForSubtitles?: (option: string, value: unknown) => void;
      })
    | null;

  moviePlayer?.loadModule?.("captions");
  moviePlayer?.setOption?.("captions", "track", request.languageCode ? { languageCode: request.languageCode } : {});
  moviePlayer?.setOption?.("captions", "reload", true);
  moviePlayer?.setOptionForSubtitles?.("track", request.languageCode ? { languageCode: request.languageCode } : {});

  const keyboardEvent = new KeyboardEvent("keydown", {
    key: "c",
    code: "KeyC",
    keyCode: 67,
    which: 67,
    bubbles: true
  });
  document.dispatchEvent(keyboardEvent);
}

async function togglePanel(): Promise<void> {
  if (panelRoot) {
    panelRoot.remove();
    panelRoot = null;
    stopPanelStatusPolling();
    return;
  }

  panelRoot = document.createElement("div");
  panelRoot.id = "yt-caption-md-panel";
  panelRoot.innerHTML = `
    <div class="ytcmd-panel">
      <div class="ytcmd-header">
        <strong>YouTube Caption to MD</strong>
        <button type="button" data-action="close">×</button>
      </div>
      <div class="ytcmd-status" data-role="status">Ready</div>
      <dl class="ytcmd-stats">
        <div>
          <dt>Segments</dt>
          <dd data-role="segments">0</dd>
        </div>
        <div>
          <dt>Words</dt>
          <dd data-role="words">0</dd>
        </div>
      </dl>
      <label>
        <span>Markdown Format</span>
        <select data-role="format">
          <option value="ai-prompt">AI Prompt</option>
          <option value="timestamp-list">Timestamp List</option>
          <option value="plain-text">Plain Text</option>
        </select>
      </label>
      <div class="ytcmd-actions">
        <button type="button" data-action="fetch-captions">抓取字幕 Markdown</button>
      </div>
      <label>
        <span>STT Provider</span>
        <select data-role="provider">
          <option value="gemini">Gemini</option>
          <option value="openai">OpenAI</option>
        </select>
      </label>
      <label>
        <span>API key</span>
        <input data-role="apiKey" type="password" placeholder="Gemini or OpenAI API key" />
      </label>
      <div class="ytcmd-actions">
        <button type="button" data-action="start">開始語音轉文字</button>
        <button type="button" data-action="stop" disabled>停止並轉錄</button>
      </div>
      <div class="ytcmd-actions">
        <button type="button" data-action="copy" disabled>複製</button>
        <button type="button" data-action="download" disabled>下載 .md</button>
      </div>
    </div>
  `;
  document.documentElement.append(panelRoot);
  installPanelStyles();
  await hydratePanel();
  wirePanelEvents();
  startPanelStatusPolling();
}

function installPanelStyles(): void {
  if (document.getElementById("yt-caption-md-panel-style")) return;

  const style = document.createElement("style");
  style.id = "yt-caption-md-panel-style";
  style.textContent = `
    #yt-caption-md-panel {
      position: fixed;
      top: 72px;
      right: 18px;
      z-index: 2147483647;
      width: 360px;
      color: #202124;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    #yt-caption-md-panel * { box-sizing: border-box; }
    #yt-caption-md-panel .ytcmd-panel {
      display: grid;
      gap: 12px;
      padding: 14px;
      border: 1px solid #dadce0;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 8px 28px rgba(60, 64, 67, 0.25);
    }
    #yt-caption-md-panel .ytcmd-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 15px;
    }
    #yt-caption-md-panel .ytcmd-status {
      min-height: 22px;
      color: #5f6368;
      font-size: 12px;
      white-space: pre-wrap;
    }
    #yt-caption-md-panel label {
      display: grid;
      gap: 6px;
      color: #5f6368;
      font-size: 12px;
    }
    #yt-caption-md-panel input,
    #yt-caption-md-panel select {
      width: 100%;
      border: 1px solid #c7c9cc;
      border-radius: 6px;
      padding: 7px 8px;
      color: #202124;
      background: #fff;
      font: inherit;
      font-size: 13px;
    }
    #yt-caption-md-panel .ytcmd-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    #yt-caption-md-panel .ytcmd-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0;
      border: 1px solid #dadce0;
      border-radius: 8px;
      overflow: hidden;
    }
    #yt-caption-md-panel .ytcmd-stats div {
      padding: 8px 10px;
    }
    #yt-caption-md-panel .ytcmd-stats div + div {
      border-left: 1px solid #dadce0;
    }
    #yt-caption-md-panel .ytcmd-stats dt,
    #yt-caption-md-panel .ytcmd-stats dd {
      margin: 0;
    }
    #yt-caption-md-panel .ytcmd-stats dt {
      color: #5f6368;
      font-size: 12px;
    }
    #yt-caption-md-panel .ytcmd-stats dd {
      margin-top: 2px;
      font-weight: 700;
      font-size: 14px;
    }
    #yt-caption-md-panel button {
      min-height: 34px;
      border: 0;
      border-radius: 6px;
      background: #1a73e8;
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-weight: 600;
    }
    #yt-caption-md-panel button:disabled {
      background: #d7dce2;
      color: #7b8188;
      cursor: default;
    }
    #yt-caption-md-panel [data-action="close"] {
      width: 30px;
      min-height: 30px;
      background: #eef3fb;
      color: #185abc;
    }
  `;
  document.head.append(style);
}

async function hydratePanel(): Promise<void> {
  if (!panelRoot) return;

  const providerSelect = getPanelElement<HTMLSelectElement>("provider");
  const apiKeyInput = getPanelElement<HTMLInputElement>("apiKey");
  const stored = await chrome.storage.local.get([STORAGE_STT_PROVIDER, STORAGE_GEMINI_API_KEY, STORAGE_OPENAI_API_KEY]);
  const provider = stored[STORAGE_STT_PROVIDER] === "openai" ? "openai" : "gemini";
  providerSelect.value = provider;
  apiKeyInput.value =
    typeof stored[provider === "gemini" ? STORAGE_GEMINI_API_KEY : STORAGE_OPENAI_API_KEY] === "string"
      ? stored[provider === "gemini" ? STORAGE_GEMINI_API_KEY : STORAGE_OPENAI_API_KEY]
      : "";
  await refreshPanelStatus();
}

function wirePanelEvents(): void {
  if (!panelRoot) return;

  panelRoot.querySelector('[data-action="close"]')?.addEventListener("click", () => {
    void togglePanel();
  });
  panelRoot.querySelector('[data-action="start"]')?.addEventListener("click", () => {
    void startPanelRecording();
  });
  panelRoot.querySelector('[data-action="fetch-captions"]')?.addEventListener("click", () => {
    void fetchPanelCaptions();
  });
  panelRoot.querySelector('[data-action="stop"]')?.addEventListener("click", () => {
    void stopPanelRecording();
  });
  panelRoot.querySelector('[data-action="copy"]')?.addEventListener("click", () => {
    void copyPanelOutput();
  });
  panelRoot.querySelector('[data-action="download"]')?.addEventListener("click", () => {
    downloadPanelMarkdown();
  });
  getPanelElement<HTMLSelectElement>("provider").addEventListener("change", () => {
    void hydratePanel();
  });
  getPanelElement<HTMLInputElement>("apiKey").addEventListener("change", () => {
    void savePanelApiKey();
  });
}

async function startPanelRecording(): Promise<void> {
  try {
    setPanelStatus("STT 啟動中");
    updatePanelButtons("transcribing");
    await savePanelApiKey();
    const response = await chrome.runtime.sendMessage({ type: "STT_START_RECORDING" });
    if (!isExtensionResponse<{ status: "idle" | "recording" | "transcribing" }>(response) || !response.ok) {
      throw new Error(isExtensionResponse(response) && !response.ok ? response.error : "STT 背景程序沒有回應。");
    }
    updatePanelButtons("recording");
    setPanelStatus("STT 錄音中");
  } catch (error) {
    updatePanelButtons("idle");
    setPanelStatus(error instanceof Error ? error.message : String(error));
  }
}

async function stopPanelRecording(): Promise<void> {
  try {
    setPanelStatus("STT 轉錄中");
    updatePanelButtons("transcribing");
    await savePanelApiKey();
    const response = await chrome.runtime.sendMessage({
      type: "STT_STOP_AND_TRANSCRIBE",
      apiKey: getPanelElement<HTMLInputElement>("apiKey").value.trim(),
      provider: getPanelElement<HTMLSelectElement>("provider").value
    });
    if (!isExtensionResponse<{ text: string; recordedAt: string }>(response) || !response.ok) {
      throw new Error(isExtensionResponse(response) && !response.ok ? response.error : "STT 背景程序沒有回應。");
    }

    const markdown = formatSttMarkdown(response.data.text, response.data.recordedAt);
    setPanelMarkdown(markdown, [
      {
        startSec: 0,
        durationSec: null,
        text: response.data.text,
        source: "speech-to-text"
      }
    ]);
    updatePanelButtons("idle");
    setPanelStatus("STT 完成");
  } catch (error) {
    updatePanelButtons("idle");
    setPanelStatus(error instanceof Error ? error.message : String(error));
  }
}

async function refreshPanelStatus(): Promise<void> {
  try {
    const response = await chrome.runtime.sendMessage({ type: "STT_GET_STATUS" });
    if (
      isExtensionResponse<{ status: "idle" | "recording" | "transcribing"; lastResult?: StoredSttResult | null }>(
        response
      ) &&
      response.ok
    ) {
      updatePanelButtons(response.data.status);
      if (response.data.status === "recording") setPanelStatus("STT 錄音中");
      if (response.data.status === "transcribing") setPanelStatus("STT 轉錄中");
      if (response.data.lastResult && response.data.lastResult.id !== lastRenderedSttResultId) {
        lastRenderedSttResultId = response.data.lastResult.id;
        setPanelMarkdown(formatSttMarkdown(response.data.lastResult.text, response.data.lastResult.recordedAt), [
          {
            startSec: 0,
            durationSec: null,
            text: response.data.lastResult.text,
            source: "speech-to-text"
          }
        ]);
        updatePanelButtons("idle");
        setPanelStatus("STT 完成");
      }
    }
  } catch {
    updatePanelButtons("idle");
  }
}

async function fetchPanelCaptions(): Promise<void> {
  try {
    setPanelStatus("抓取字幕中");
    const playerResponse = extractPlayerResponseFromScripts();
    const tracks = extractCaptionTracks(playerResponse);
    const selectedTrack = selectBestTrack(tracks);

    if (!selectedTrack) {
      throw new Error("找不到可用字幕軌。");
    }

    await triggerCaptionPlayback({ languageCode: selectedTrack.languageCode });
    await delay(1800);
    const caption = await fetchBestCaptionForTrack(selectedTrack);
    const segments = parseCaptionResponse(caption, selectedTrack.languageCode);

    if (!segments.length) {
      throw new Error("字幕解析後沒有內容。");
    }

    const video = getCurrentVideoInfo();
    const payload: TranscriptPayload = {
      video,
      selectedTrack,
      segments
    };
    setPanelMarkdown(formatTranscriptMarkdown(payload, getPanelFormat()), segments);
    setPanelStatus(`完成：${segments.length} segments`);
  } catch (error) {
    setPanelStatus(error instanceof Error ? error.message : String(error));
  }
}

async function fetchBestCaptionForTrack(track: CaptionTrack): Promise<FetchCaptionResponse> {
  try {
    return await fetchCaptionTrackFromPage(track);
  } catch {
    return await fetchCapturedTimedtextForPanel(track);
  }
}

async function fetchCapturedTimedtextForPanel(track: CaptionTrack): Promise<FetchCaptionResponse> {
  const response = await chrome.runtime.sendMessage({ type: "CAPTION_GET_CAPTURED_URLS" });

  if (!isExtensionResponse<{ urls: string[] }>(response) || !response.ok) {
    throw new Error("沒有 captured timedtext URL。");
  }

  for (const candidate of response.data.urls.filter((url) => isMatchingTimedtextUrl(url, track.languageCode))) {
    for (const fmt of ["json3", "", "srv3", "vtt"]) {
      const url = new URL(candidate);
      if (fmt) url.searchParams.set("fmt", fmt);
      const result = await fetchTimedtextUrlForPanel(url.toString(), fmt || "unknown");
      if ("raw" in result) return result;
    }
  }

  throw new Error("captured timedtext fallback 失敗。");
}

async function fetchTimedtextUrlForPanel(url: string, format: string): Promise<FetchCaptionResponse | { error: string }> {
  try {
    const response = await fetch(url, { credentials: "include", cache: "no-store" });
    const raw = await response.text();
    if (!response.ok) return { error: `${format}: HTTP ${response.status}` };
    if (!raw.trim()) return { error: `${format}: empty response` };
    return {
      raw,
      format: format === "json3" || format === "srv3" || format === "vtt" ? format : inferCaptionFormat(raw)
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

function setPanelMarkdown(value: string, segments: TranscriptSegment[]): void {
  panelMarkdown = value;
  const copyButton = panelRoot?.querySelector<HTMLButtonElement>('[data-action="copy"]');
  const downloadButton = panelRoot?.querySelector<HTMLButtonElement>('[data-action="download"]');
  const hasValue = Boolean(value.trim());
  if (copyButton) copyButton.disabled = !hasValue;
  if (downloadButton) downloadButton.disabled = !hasValue;
  setPanelStats(segments);
}

function setPanelStats(segments: TranscriptSegment[]): void {
  getPanelElement<HTMLElement>("segments").textContent = String(segments.length);
  getPanelElement<HTMLElement>("words").textContent = String(countWords(segments.map((segment) => segment.text).join(" ")));
}

function startPanelStatusPolling(): void {
  stopPanelStatusPolling();
  panelStatusTimer = window.setInterval(() => {
    void refreshPanelStatus();
  }, 1000);
}

function stopPanelStatusPolling(): void {
  if (panelStatusTimer !== null) {
    window.clearInterval(panelStatusTimer);
    panelStatusTimer = null;
  }
}

async function savePanelApiKey(): Promise<void> {
  const provider = getPanelElement<HTMLSelectElement>("provider").value === "openai" ? "openai" : "gemini";
  const keyName = provider === "gemini" ? STORAGE_GEMINI_API_KEY : STORAGE_OPENAI_API_KEY;
  await chrome.storage.local.set({
    [STORAGE_STT_PROVIDER]: provider,
    [keyName]: getPanelElement<HTMLInputElement>("apiKey").value.trim()
  });
}

async function copyPanelOutput(): Promise<void> {
  await navigator.clipboard.writeText(panelMarkdown);
  setPanelStatus("已複製");
}

function downloadPanelMarkdown(): void {
  if (!panelMarkdown.trim()) return;

  const video = getCurrentVideoInfo();
  const blob = new Blob([panelMarkdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${sanitizeFilename(video.title)}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
  setPanelStatus("已下載");
}

function formatSttMarkdown(text: string, recordedAt: string): string {
  const video = getCurrentVideoInfo();
  return [
    "# YouTube Transcript",
    "",
    `Title: ${video.title}`,
    `URL: ${video.url}`,
    "Source: speech-to-text",
    `Captured at: ${recordedAt}`,
    "",
    "---",
    "",
    text.trim()
  ].join("\n");
}

function getPanelFormat(): MarkdownFormat {
  const value = getPanelElement<HTMLSelectElement>("format").value;
  if (value === "timestamp-list" || value === "plain-text") return value;
  return "ai-prompt";
}

function countWords(text: string): number {
  const latinWords = text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const cjkChars = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return latinWords + cjkChars;
}

function sanitizeFilename(title: string): string {
  return (
    title
      .replace(/[\\/:*?"<>|]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 120) || "youtube-transcript"
  );
}

function isMatchingTimedtextUrl(url: string, languageCode: string): boolean {
  try {
    const parsed = new URL(url);
    const lang = parsed.searchParams.get("lang") || parsed.searchParams.get("tlang") || "";
    return !lang || lang === languageCode || lang.split("-")[0] === languageCode.split("-")[0];
  } catch {
    return false;
  }
}

function updatePanelButtons(status: "idle" | "recording" | "transcribing"): void {
  const startButton = panelRoot?.querySelector<HTMLButtonElement>('[data-action="start"]');
  const stopButton = panelRoot?.querySelector<HTMLButtonElement>('[data-action="stop"]');
  if (startButton) startButton.disabled = status !== "idle";
  if (stopButton) stopButton.disabled = status !== "recording";
}

function setPanelStatus(message: string): void {
  const status = panelRoot?.querySelector<HTMLElement>('[data-role="status"]');
  if (status) status.textContent = message;
}

function getPanelElement<T extends HTMLElement>(role: string): T {
  const element = panelRoot?.querySelector(`[data-role="${role}"]`);
  if (!element) throw new Error(`Missing panel element: ${role}`);
  return element as T;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

type ExtensionResponse<T> = { ok: true; data: T } | { ok: false; error: string };

function isExtensionResponse<T>(value: unknown): value is ExtensionResponse<T> {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof (value as { ok?: unknown }).ok === "boolean"
  );
}

async function fetchCaptionTrackFromPage(track: FetchCaptionRequest["track"]): Promise<FetchCaptionResponse> {
  const attempts: Array<{ format: FetchCaptionResponse["format"]; fmt: string | null }> = [
    { format: "json3", fmt: "json3" },
    { format: "unknown", fmt: null },
    { format: "srv3", fmt: "srv3" },
    { format: "vtt", fmt: "vtt" }
  ];
  const errors: string[] = [];

  for (const attempt of attempts) {
    const url = new URL(track.baseUrl);
    if (attempt.fmt) {
      url.searchParams.set("fmt", attempt.fmt);
    }

    const response = await fetch(url.toString(), {
      credentials: "include",
      cache: "no-store"
    });

    if (!response.ok) {
      errors.push(`${attempt.format}: HTTP ${response.status}`);
      continue;
    }

    const raw = await response.text();
    if (!raw.trim()) {
      errors.push(`${attempt.format}: empty response`);
      continue;
    }

    return {
      raw,
      format: attempt.format === "unknown" ? inferCaptionFormat(raw) : attempt.format
    };
  }

  throw new Error(`頁面端字幕抓取失敗：${errors.join("; ")}`);
}

function inferCaptionFormat(raw: string): FetchCaptionResponse["format"] {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith("{")) return "json3";
  if (trimmed.startsWith("WEBVTT")) return "vtt";
  if (trimmed.startsWith("<")) return "xml";
  return "unknown";
}

async function fetchTranscriptPanelFromPage(): Promise<FetchTranscriptPanelResponse> {
  const pageText = Array.from(document.querySelectorAll("script"))
    .map((script) => script.textContent || "")
    .join("\n");
  const params = pageText.match(/"getTranscriptEndpoint":\{"params":"([^"]+)"/)?.[1];
  const apiKey = pageText.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
  const clientVersion = pageText.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];

  if (!params || !apiKey || !clientVersion) {
    throw new Error("找不到 YouTube transcript endpoint。");
  }

  const response = await fetch(`https://www.youtube.com/youtubei/v1/get_transcript?key=${apiKey}`, {
    method: "POST",
    credentials: "include",
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      "x-youtube-client-name": "1",
      "x-youtube-client-version": clientVersion
    },
    body: JSON.stringify({
      context: {
        client: {
          clientName: "WEB",
          clientVersion,
          hl: document.documentElement.lang || "zh-TW",
          gl: "TW",
          utcOffsetMinutes: -new Date().getTimezoneOffset()
        }
      },
      params
    })
  });

  const raw = await response.text();
  if (!response.ok) {
    throw new Error(`transcript endpoint HTTP ${response.status}: ${raw.slice(0, 120)}`);
  }

  const data = JSON.parse(raw);
  const segments = extractTranscriptPanelSegments(data);

  if (!segments.length) {
    throw new Error("transcript endpoint 沒有回傳可解析逐字稿。");
  }

  return { segments };
}

function extractTranscriptPanelSegments(value: unknown): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  walk(value, (node) => {
    const renderer = node.transcriptSegmentRenderer ?? node.transcriptCueRenderer;
    if (!renderer || typeof renderer !== "object") return;

    const text = getText(renderer.snippet ?? renderer.cue);
    const startMs = Number(renderer.startMs ?? renderer.startOffsetMs ?? renderer.startTimeMs ?? 0);
    const durationMs = renderer.durationMs === undefined ? null : Number(renderer.durationMs);

    if (!text) return;

    segments.push({
      startSec: startMs / 1000,
      durationSec: durationMs === null || Number.isNaN(durationMs) ? null : durationMs / 1000,
      text,
      source: "transcript-panel",
      languageCode: "zh-TW"
    });
  });

  return segments;
}

function walk(value: unknown, visit: (node: Record<string, any>) => void): void {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) walk(item, visit);
    return;
  }

  const node = value as Record<string, any>;
  visit(node);

  for (const child of Object.values(node)) {
    walk(child, visit);
  }
}

function getText(value: any): string {
  if (!value) return "";
  if (typeof value.simpleText === "string") return value.simpleText.trim();
  if (Array.isArray(value.runs)) {
    return value.runs.map((run: { text?: string }) => run.text ?? "").join("").trim();
  }
  return "";
}

function extractCaptionTracks(playerResponse: unknown): CaptionTrack[] {
  const response = playerResponse as {
    captions?: {
      playerCaptionsTracklistRenderer?: {
        captionTracks?: Array<{
          baseUrl?: string;
          name?: { simpleText?: string; runs?: Array<{ text?: string }> };
          languageCode?: string;
          kind?: string;
          vssId?: string;
        }>;
      };
    };
  };
  const rawTracks = response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!Array.isArray(rawTracks)) return [];

  return rawTracks
    .map((track): CaptionTrack | null => {
      if (!track.baseUrl || !track.languageCode) return null;
      return {
        baseUrl: track.baseUrl,
        name: track.name?.simpleText || track.name?.runs?.map((run) => run.text ?? "").join("") || track.languageCode,
        languageCode: track.languageCode,
        kind: track.kind,
        isAutoGenerated: track.kind === "asr" || track.vssId?.startsWith("a.") === true
      };
    })
    .filter((track): track is CaptionTrack => Boolean(track));
}

function selectBestTrack(tracks: CaptionTrack[]): CaptionTrack | null {
  const preferredLanguages = ["zh-TW", "zh-Hant", "zh", "en", "ja"];
  const candidates = [...tracks.filter((track) => !track.isAutoGenerated), ...tracks.filter((track) => track.isAutoGenerated)];

  for (const language of preferredLanguages) {
    const exact = candidates.find((track) => track.languageCode === language);
    if (exact) return exact;
    const loose = candidates.find((track) => track.languageCode.split("-")[0] === language.split("-")[0]);
    if (loose) return loose;
  }

  return candidates[0] ?? null;
}

function parseCaptionResponse(caption: FetchCaptionResponse, languageCode?: string): TranscriptSegment[] {
  if (caption.format === "json3") {
    const data = JSON.parse(caption.raw) as {
      events?: Array<{ tStartMs?: number; dDurationMs?: number; segs?: Array<{ utf8?: string }> }>;
    };
    return (data.events ?? [])
      .filter((event) => event.segs?.length)
      .map((event) => ({
        startSec: (event.tStartMs ?? 0) / 1000,
        durationSec: typeof event.dDurationMs === "number" ? event.dDurationMs / 1000 : null,
        text: (event.segs ?? []).map((segment) => segment.utf8 ?? "").join("").trim(),
        source: "caption-track" as const,
        languageCode
      }))
      .filter((segment) => segment.text);
  }

  const doc = new DOMParser().parseFromString(caption.raw, "text/xml");
  return Array.from(doc.querySelectorAll("text"))
    .map((node) => ({
      startSec: Number(node.getAttribute("start") || 0),
      durationSec: node.hasAttribute("dur") ? Number(node.getAttribute("dur")) : null,
      text: (node.textContent || "").trim(),
      source: "caption-track" as const,
      languageCode
    }))
    .filter((segment) => segment.text);
}

function formatTranscriptMarkdown(payload: TranscriptPayload, format: MarkdownFormat): string {
  if (format === "plain-text") {
    return [`# ${payload.video.title}`, "", `Source: ${payload.video.url}`, "", "## Transcript", "", ...payload.segments.map((segment) => segment.text)].join("\n\n");
  }

  if (format === "timestamp-list") {
    return [
      `# ${payload.video.title}`,
      "",
      `Source: ${payload.video.url}`,
      "",
      "## Transcript",
      "",
      ...payload.segments.map((segment) => `- [${formatTimestamp(segment.startSec)}] ${segment.text}`)
    ].join("\n");
  }

  return [
    "# YouTube Transcript",
    "",
    `Title: ${payload.video.title}`,
    `URL: ${payload.video.url}`,
    `Language: ${payload.selectedTrack?.languageCode ?? "unknown"}`,
    `Caption type: ${payload.selectedTrack?.isAutoGenerated ? "auto-generated" : "manual"}`,
    `Captured at: ${payload.video.capturedAt}`,
    "",
    "Please summarize the following transcript:",
    "",
    "---",
    "",
    ...payload.segments.map((segment) => `[${formatTimestamp(segment.startSec)}] ${segment.text}`)
  ].join("\n");
}

function formatTimestamp(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}

async function fetchInnertubeCaptionFromPage(request: FetchInnertubeCaptionRequest): Promise<FetchCaptionResponse> {
  const pageText = Array.from(document.querySelectorAll("script"))
    .map((script) => script.textContent || "")
    .join("\n");
  const apiKey = pageText.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];

  if (!apiKey) {
    throw new Error("找不到 YouTube Innertube API key。");
  }

  const clients = [
    {
      clientName: "ANDROID",
      clientVersion: "20.10.38",
      userAgent: "com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip",
      clientScreen: "WATCH"
    },
    {
      clientName: "IOS",
      clientVersion: "20.10.4",
      userAgent: "com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_4 like Mac OS X)",
      clientScreen: "WATCH"
    }
  ];
  const errors: string[] = [];

  for (const client of clients) {
    const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
      method: "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        "x-youtube-client-name": client.clientName === "ANDROID" ? "3" : "5",
        "x-youtube-client-version": client.clientVersion
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: client.clientName,
            clientVersion: client.clientVersion,
            userAgent: client.userAgent,
            clientScreen: client.clientScreen,
            hl: document.documentElement.lang || "zh-TW",
            gl: "TW"
          }
        },
        videoId: request.videoId
      })
    });

    const rawPlayer = await response.text();
    if (!response.ok) {
      errors.push(`${client.clientName}: player HTTP ${response.status}`);
      continue;
    }

    const player = JSON.parse(rawPlayer);
    const rawTracks =
      player?.captions?.playerCaptionsTracklistRenderer?.captionTracks instanceof Array
        ? player.captions.playerCaptionsTracklistRenderer.captionTracks
        : [];

    const track =
      rawTracks.find((item: any) => item.languageCode === request.preferredLanguageCode) ??
      rawTracks.find((item: any) => item.languageCode?.split("-")[0] === request.preferredLanguageCode?.split("-")[0]) ??
      rawTracks[0];

    if (!track?.baseUrl) {
      errors.push(`${client.clientName}: no caption track`);
      continue;
    }

    const captionUrl = new URL(track.baseUrl);
    captionUrl.searchParams.set("fmt", "json3");

    const captionResponse = await fetch(captionUrl.toString(), {
      credentials: "include",
      cache: "no-store"
    });
    const raw = await captionResponse.text();

    if (!captionResponse.ok) {
      errors.push(`${client.clientName}: caption HTTP ${captionResponse.status}`);
      continue;
    }

    if (!raw.trim()) {
      errors.push(`${client.clientName}: empty caption`);
      continue;
    }

    return {
      raw,
      format: "json3"
    };
  }

  throw new Error(`Innertube caption fallback 失敗：${errors.join("; ")}`);
}

function extractPlayerResponseFromScripts(): unknown | null {
  const scripts = Array.from(document.querySelectorAll("script"));

  for (const script of scripts) {
    const playerResponse = extractPlayerResponseFromText(script.textContent || "");
    if (playerResponse) return playerResponse;
  }

  return null;
}

function extractPlayerResponseFromText(text: string): unknown | null {
  const marker = "ytInitialPlayerResponse";
  const markerIndex = text.indexOf(marker);
  if (markerIndex === -1) return null;

  const jsonStart = text.indexOf("{", markerIndex);
  if (jsonStart === -1) return null;

  const jsonText = extractBalancedJsonObject(text, jsonStart);
  if (!jsonText) return null;

  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

function extractBalancedJsonObject(text: string, startIndex: number): string | null {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return text.slice(startIndex, index + 1);
      }
    }
  }

  return null;
}
