import "./popup.css";
import { fetchCaptionTrack } from "../core/captionFetcher";
import { extractCaptionTracks } from "../core/captionTrackFinder";
import { parseCaptionResponse } from "../core/captionParser";
import { createMarkdownFilename, downloadMarkdown } from "../core/download";
import { selectBestTrack } from "../core/languageSelector";
import { formatTranscriptMarkdown } from "../core/markdownFormatter";
import { extractPlayerResponseFromText } from "../core/playerResponseExtractor";
import type {
  CaptionTrack,
  ExtractPageDataResponse,
  FetchCaptionResponse,
  FetchInnertubeCaptionRequest,
  FetchTranscriptPanelResponse,
  MarkdownFormat,
  SttResult,
  SttProvider,
  SttStatus,
  TranscriptPayload,
  TranscriptSegment,
  VideoInfo
} from "../types/transcript";

const REQUEST_TYPE = "TRANSCRIBE_EXTRACT_PAGE_DATA";
const FETCH_CAPTION_TYPE = "TRANSCRIBE_FETCH_CAPTION_TRACK";
const FETCH_TRANSCRIPT_PANEL_TYPE = "TRANSCRIBE_FETCH_TRANSCRIPT_PANEL";
const FETCH_INNERTUBE_CAPTION_TYPE = "TRANSCRIBE_FETCH_INNERTUBE_CAPTION";
const CAPTION_GET_CAPTURED_CONTENTS_TYPE = "CAPTION_GET_CAPTURED_CONTENTS";
const CAPTION_CLEAR_CAPTURED_URLS_TYPE = "CAPTION_CLEAR_CAPTURED_URLS";
const TRIGGER_CAPTION_TYPE = "TRANSCRIBE_TRIGGER_CAPTION_PLAYBACK";
const STORAGE_FORMAT_KEY = "preferredMarkdownFormat";
const STORAGE_OPENAI_API_KEY = "openaiApiKey";
const STORAGE_GEMINI_API_KEY = "geminiApiKey";
const STORAGE_STT_PROVIDER = "sttProvider";

const statusText = getElement<HTMLParagraphElement>("statusText");
const videoTitle = getElement<HTMLElement>("videoTitle");
const trackSelect = getElement<HTMLSelectElement>("trackSelect");
const fetchButton = getElement<HTMLButtonElement>("fetchButton");
const copyButton = getElement<HTMLButtonElement>("copyButton");
const downloadButton = getElement<HTMLButtonElement>("downloadButton");
const sttProviderSelect = getElement<HTMLSelectElement>("sttProviderSelect");
const apiKeyInput = getElement<HTMLInputElement>("apiKeyInput");
const startSttButton = getElement<HTMLButtonElement>("startSttButton");
const stopSttButton = getElement<HTMLButtonElement>("stopSttButton");
const segmentCount = getElement<HTMLElement>("segmentCount");
const wordCount = getElement<HTMLElement>("wordCount");

let video: VideoInfo | null = null;
let tracks: CaptionTrack[] = [];
let markdown = "";
let sttStatusTimer: number | null = null;

document.addEventListener("DOMContentLoaded", () => {
  void restorePreferredFormat();
  void restoreApiKey();
  void initializePopup();
  void refreshSttStatus();
});

fetchButton.addEventListener("click", () => {
  void fetchSelectedTrack();
});

copyButton.addEventListener("click", () => {
  void copyMarkdown();
});

downloadButton.addEventListener("click", () => {
  if (!video || !markdown) return;
  downloadMarkdown(markdown, createMarkdownFilename(video.title));
});

apiKeyInput.addEventListener("change", () => {
  void saveCurrentApiKey();
});

sttProviderSelect.addEventListener("change", () => {
  void handleProviderChange();
});

startSttButton.addEventListener("click", () => {
  void startSpeechToText();
});

stopSttButton.addEventListener("click", () => {
  void stopSpeechToText();
});

document.querySelectorAll<HTMLInputElement>('input[name="format"]').forEach((input) => {
  input.addEventListener("change", () => {
    void chrome.storage.local.set({ [STORAGE_FORMAT_KEY]: getSelectedFormat() });
  });
});

async function initializePopup(): Promise<void> {
  setStatus("讀取分頁中");
  setActionsEnabled(false);

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) {
      throw new Error("找不到目前分頁。");
    }

    const pageData = await extractPageData(tab.id);
    video = pageData.video;
    videoTitle.textContent = video.title;

    const injected = await extractPlayerResponseFromMainWorld(tab.id);
    tracks = mergeTracks(extractCaptionTracks(injected), extractCaptionTracks(pageData.playerResponse));

    if (!tracks.length) {
      const fetched = await extractPlayerResponseFromWatchHtml(video.videoId);
      tracks = extractCaptionTracks(fetched);
    }

    renderTracks(tracks);

    if (!tracks.length) {
      setStatus("沒有字幕，可改用 STT");
      fetchButton.disabled = true;
      return;
    }

    setStatus("Ready");
    fetchButton.disabled = false;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error));
    fetchButton.disabled = true;
  }
}

async function startSpeechToText(): Promise<void> {
  try {
    updateSttButtons("transcribing");
    setStatus("STT 啟動中");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) {
      throw new Error("找不到目前分頁。");
    }

    await saveCurrentApiKey();
    const response = await chrome.runtime.sendMessage({
      type: "STT_START_RECORDING",
      tabId: tab.id
    });

    if (!isExtensionResponse<{ status: SttStatus }>(response)) {
      throw new Error("STT 背景程序沒有回應。");
    }
    if (!response.ok) {
      throw new Error(response.error);
    }

    updateSttButtons("recording");
    startSttStatusPolling();
    setStatus("STT 錄音中");
  } catch (error) {
    updateSttButtons("idle");
    setStatus(error instanceof Error ? error.message : String(error));
  }
}

async function stopSpeechToText(): Promise<void> {
  if (!video) {
    setStatus("請先讀取影片資訊");
    return;
  }

  try {
    setStatus("STT 轉錄中");
    updateSttButtons("transcribing");
    const response = await chrome.runtime.sendMessage({
      type: "STT_STOP_AND_TRANSCRIBE",
      apiKey: apiKeyInput.value.trim(),
      provider: getSelectedProvider()
    });

    if (!isExtensionResponse<SttResult>(response)) {
      throw new Error("STT 背景程序沒有回應。");
    }
    if (!response.ok) {
      throw new Error(response.error);
    }

    const text = response.data.text;
    if (!text) {
      throw new Error("STT 沒有回傳文字。");
    }

    const segments: TranscriptSegment[] = [
      {
        startSec: 0,
        durationSec: null,
        text,
        source: "speech-to-text",
        languageCode: "unknown"
      }
    ];
    markdown = formatTranscriptMarkdown(
      {
        video: {
          ...video,
          capturedAt: response.data.recordedAt
        },
        selectedTrack: null,
        segments
      },
      getSelectedFormat()
    );
    renderStats(segments);
    setActionsEnabled(true);
    updateSttButtons("idle");
    stopSttStatusPolling();
    setStatus("STT 完成");
  } catch (error) {
    updateSttButtons("idle");
    stopSttStatusPolling();
    setStatus(error instanceof Error ? error.message : String(error));
  }
}

async function refreshSttStatus(): Promise<void> {
  try {
    const response = await chrome.runtime.sendMessage({ type: "STT_GET_STATUS" });
    if (isExtensionResponse<{ status: SttStatus }>(response) && response.ok) {
      updateSttButtons(response.data.status);
    }
  } catch {
    updateSttButtons("idle");
  }
}

async function extractPageData(tabId: number): Promise<ExtractPageDataResponse> {
  let response: unknown;

  try {
    response = await chrome.tabs.sendMessage(tabId, { type: REQUEST_TYPE });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["youtubePageExtractor.js"]
    });
    response = await chrome.tabs.sendMessage(tabId, { type: REQUEST_TYPE });
  }

  if (!isExtensionResponse<ExtractPageDataResponse>(response)) {
    throw new Error("Content script 沒有回應，請確認目前是 YouTube 影片頁。");
  }

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.data;
}

async function extractPlayerResponseFromMainWorld(tabId: number): Promise<unknown | null> {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    world: "MAIN",
    func: () => {
      const pageWindow = window as Window & {
        ytInitialPlayerResponse?: unknown;
        ytplayer?: {
          config?: {
            args?: {
              player_response?: string;
              raw_player_response?: unknown;
            };
          };
        };
      };

      if (pageWindow.ytInitialPlayerResponse) {
        return pageWindow.ytInitialPlayerResponse;
      }

      const moviePlayer = document.querySelector("#movie_player") as
        | (Element & { getPlayerResponse?: () => unknown })
        | null;
      const apiResponse = moviePlayer?.getPlayerResponse?.();
      if (apiResponse) {
        return apiResponse;
      }

      const rawPlayerResponse = pageWindow.ytplayer?.config?.args?.raw_player_response;
      if (rawPlayerResponse) {
        return rawPlayerResponse;
      }

      const playerResponse = pageWindow.ytplayer?.config?.args?.player_response;
      if (typeof playerResponse === "string") {
        try {
          return JSON.parse(playerResponse);
        } catch {
          return null;
        }
      }

      return null;
    }
  });

  return result ?? null;
}

async function extractPlayerResponseFromWatchHtml(videoId: string): Promise<unknown | null> {
  const url = new URL("https://www.youtube.com/watch");
  url.searchParams.set("v", videoId);
  url.searchParams.set("hl", "zh-TW");

  const response = await fetch(url.toString(), { credentials: "include" });
  if (!response.ok) {
    return null;
  }

  return extractPlayerResponseFromText(await response.text());
}

async function fetchSelectedTrack(): Promise<void> {
  if (!video) return;

  const selectedTrack = tracks[trackSelect.selectedIndex];
  if (!selectedTrack) {
    setStatus("請先選字幕軌");
    return;
  }

  setStatus("抓取字幕中");
  setActionsEnabled(false);

  try {
    await prepareCapturedCaptionFallback(selectedTrack);
    const { segments, track } = await getSegmentsWithFallback(selectedTrack);

    const payload: TranscriptPayload = {
      video,
      selectedTrack: track,
      segments
    };

    markdown = formatTranscriptMarkdown(payload, getSelectedFormat());
    renderStats(segments);
    setStatus("完成");
    setActionsEnabled(true);
  } catch (error) {
    setStatus(error instanceof Error ? error.message : String(error));
    setActionsEnabled(false);
  }
}

async function prepareCapturedCaptionFallback(track: CaptionTrack): Promise<void> {
  await clearCapturedCaptionUrls();
  await triggerCaptionPlayback(track);
  await delay(1800);
}

async function clearCapturedCaptionUrls(): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;

  await chrome.runtime.sendMessage({
    type: CAPTION_CLEAR_CAPTURED_URLS_TYPE,
    tabId: tab.id
  });
}

async function triggerCaptionPlayback(track: CaptionTrack): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) return;

  await chrome.tabs.sendMessage(tab.id, {
    type: TRIGGER_CAPTION_TYPE,
    languageCode: track.languageCode
  });
}

async function getSegmentsWithFallback(preferredTrack: CaptionTrack): Promise<{ segments: TranscriptSegment[]; track: CaptionTrack }> {
  let captionError: unknown = null;
  let innertubeError: unknown = null;

  try {
    const { fetched, track } = await fetchFirstWorkingTrack(preferredTrack);
    const segments = parseCaptionResponse(fetched, track.languageCode);

    if (!segments.length) {
      throw new Error("字幕解析後沒有內容。");
    }

    return { segments, track };
  } catch (error) {
    captionError = error;

    try {
      const captured = await fetchCapturedTimedtextFallback(preferredTrack);
      if (captured.raw.trim()) {
        return {
          segments: parseCaptionResponse(captured, preferredTrack.languageCode),
          track: preferredTrack
        };
      }
    } catch {
      // Continue to the active Innertube and transcript panel fallbacks.
    }

    try {
      const innertube = await fetchInnertubeCaptionFallback(preferredTrack);
      if (innertube.raw.trim()) {
        return {
          segments: parseCaptionResponse(innertube, preferredTrack.languageCode),
          track: preferredTrack
        };
      }
    } catch (error) {
      innertubeError = error;
    }

    try {
      const panel = await fetchTranscriptPanelFallback();
      if (!panel.segments.length) {
        throw new Error("逐字稿面板沒有可解析內容。");
      }

      return { segments: panel.segments, track: preferredTrack };
    } catch (panelError) {
      throw new Error(
        [
          "所有字幕 fallback 都失敗。",
          `captionTracks: ${formatError(captionError)}`,
          `Innertube player: ${formatError(innertubeError)}`,
          `transcript panel: ${formatError(panelError)}`
        ].join("\n")
      );
    }
  }
}

async function fetchCapturedTimedtextFallback(track: CaptionTrack): Promise<FetchCaptionResponse> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    throw new Error("找不到目前分頁。");
  }

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const request = {
      type: CAPTION_GET_CAPTURED_CONTENTS_TYPE,
      tabId: tab.id
    };
    const response = await chrome.runtime.sendMessage(request);

    if (!isExtensionResponse<{ contents: Array<{ url: string; raw: string }> }>(response) || !response.ok) {
      throw new Error("沒有 captured timedtext 內容。");
    }

    const matches = response.data.contents.filter((item) => isMatchingTimedtextUrl(item.url, track.languageCode));
    if (matches.length > 0) {
      const match = matches[0];
      return {
        raw: match.raw,
        format: inferCaptionFormat(match.raw)
      };
    }

    await triggerCaptionPlayback(track);
    await delay(900);
  }

  throw new Error("captured timedtext fallback 失敗。");
}

async function fetchInnertubeCaptionFallback(track: CaptionTrack): Promise<FetchCaptionResponse> {
  if (!video) {
    throw new Error("尚未讀取影片資訊。");
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    throw new Error("找不到目前分頁。");
  }

  const request: FetchInnertubeCaptionRequest & { type: typeof FETCH_INNERTUBE_CAPTION_TYPE } = {
    type: FETCH_INNERTUBE_CAPTION_TYPE,
    videoId: video.videoId,
    preferredLanguageCode: track.languageCode
  };
  const response = await chrome.tabs.sendMessage(tab.id, request);

  if (!isExtensionResponse<FetchCaptionResponse>(response)) {
    throw new Error("Innertube caption fallback 沒有回應。");
  }

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.data;
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

function inferCaptionFormat(raw: string): FetchCaptionResponse["format"] {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith("{")) return "json3";
  if (trimmed.startsWith("WEBVTT")) return "vtt";
  if (trimmed.startsWith("<")) return "xml";
  return "unknown";
}

async function fetchFirstWorkingTrack(preferredTrack: CaptionTrack): Promise<{ fetched: FetchCaptionResponse; track: CaptionTrack }> {
  const orderedTracks = [preferredTrack, ...tracks.filter((track) => track.baseUrl !== preferredTrack.baseUrl)];
  const errors: string[] = [];

  for (const track of orderedTracks) {
    try {
      const fetched = await fetchCaptionWithFallback(track);
      if (fetched.raw.trim()) {
        return { fetched, track };
      }
      errors.push(`${track.languageCode}: empty response`);
    } catch (error) {
      errors.push(`${track.languageCode}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`所有字幕軌都抓取失敗：${errors.join("; ")}`);
}

async function fetchTranscriptPanelFallback(): Promise<FetchTranscriptPanelResponse> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab.id) {
    throw new Error("找不到目前分頁。");
  }

  const response = await chrome.tabs.sendMessage(tab.id, {
    type: FETCH_TRANSCRIPT_PANEL_TYPE
  });

  if (!isExtensionResponse<FetchTranscriptPanelResponse>(response)) {
    throw new Error("逐字稿面板 fallback 沒有回應。");
  }

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.data;
}

async function fetchCaptionWithFallback(track: CaptionTrack): Promise<FetchCaptionResponse> {
  try {
    return await fetchCaptionTrack(track);
  } catch (popupError) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.id) {
      throw popupError;
    }

    const response = await chrome.tabs.sendMessage(tab.id, {
      type: FETCH_CAPTION_TYPE,
      track
    });

    if (!isExtensionResponse<FetchCaptionResponse>(response)) {
      throw popupError;
    }

    if (!response.ok) {
      throw new Error(`${popupError instanceof Error ? popupError.message : String(popupError)}; ${response.error}`);
    }

    return response.data;
  }
}

function mergeTracks(...trackGroups: CaptionTrack[][]): CaptionTrack[] {
  const seen = new Set<string>();
  const merged: CaptionTrack[] = [];

  for (const track of trackGroups.flat()) {
    const key = `${track.languageCode}:${track.kind ?? ""}:${track.name}:${track.baseUrl}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(track);
  }

  return merged;
}

async function copyMarkdown(): Promise<void> {
  if (!markdown) return;

  try {
    await navigator.clipboard.writeText(markdown);
    setStatus("已複製");
  } catch {
    setStatus("複製失敗，可改下載 .md");
  }
}

function renderTracks(nextTracks: CaptionTrack[]): void {
  trackSelect.replaceChildren();

  const selected = selectBestTrack(nextTracks);

  for (const track of nextTracks) {
    const option = document.createElement("option");
    option.value = track.baseUrl;
    option.textContent = `${track.name} (${track.languageCode}${track.isAutoGenerated ? ", 自動" : ""})`;
    option.selected = track === selected;
    trackSelect.append(option);
  }
}

function renderStats(segments: TranscriptSegment[]): void {
  segmentCount.textContent = String(segments.length);
  wordCount.textContent = String(countWords(segments.map((segment) => segment.text).join(" ")));
}

function getSelectedFormat(): MarkdownFormat {
  return document.querySelector<HTMLInputElement>('input[name="format"]:checked')?.value as MarkdownFormat;
}

async function restorePreferredFormat(): Promise<void> {
  const stored = await chrome.storage.local.get(STORAGE_FORMAT_KEY);
  const value = stored[STORAGE_FORMAT_KEY];

  if (value === "ai-prompt" || value === "timestamp-list" || value === "plain-text") {
    const input = document.querySelector<HTMLInputElement>(`input[name="format"][value="${value}"]`);
    if (input) input.checked = true;
  }
}

async function restoreApiKey(): Promise<void> {
  const stored = await chrome.storage.local.get([STORAGE_STT_PROVIDER, STORAGE_OPENAI_API_KEY, STORAGE_GEMINI_API_KEY]);
  const provider = stored[STORAGE_STT_PROVIDER];

  if (provider === "gemini" || provider === "openai") {
    sttProviderSelect.value = provider;
  }

  const value = getSelectedProvider() === "gemini" ? stored[STORAGE_GEMINI_API_KEY] : stored[STORAGE_OPENAI_API_KEY];

  if (typeof value === "string") {
    apiKeyInput.value = value;
  }
}

async function handleProviderChange(): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_STT_PROVIDER]: getSelectedProvider() });
  const keyName = getSelectedProvider() === "gemini" ? STORAGE_GEMINI_API_KEY : STORAGE_OPENAI_API_KEY;
  const stored = await chrome.storage.local.get(keyName);
  apiKeyInput.value = typeof stored[keyName] === "string" ? stored[keyName] : "";
}

async function saveCurrentApiKey(): Promise<void> {
  const keyName = getSelectedProvider() === "gemini" ? STORAGE_GEMINI_API_KEY : STORAGE_OPENAI_API_KEY;
  await chrome.storage.local.set({
    [STORAGE_STT_PROVIDER]: getSelectedProvider(),
    [keyName]: apiKeyInput.value.trim()
  });
}

function getSelectedProvider(): SttProvider {
  return sttProviderSelect.value === "openai" ? "openai" : "gemini";
}

function countWords(text: string): number {
  const latinWords = text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)?.length ?? 0;
  const cjkChars = text.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  return latinWords + cjkChars;
}

function setStatus(message: string): void {
  statusText.textContent = message;
}

function setActionsEnabled(enabled: boolean): void {
  copyButton.disabled = !enabled;
  downloadButton.disabled = !enabled;
}

function updateSttButtons(status: SttStatus): void {
  startSttButton.disabled = status !== "idle";
  stopSttButton.disabled = status !== "recording";
}

function startSttStatusPolling(): void {
  stopSttStatusPolling();
  sttStatusTimer = window.setInterval(() => {
    void refreshSttStatus();
  }, 1000);
}

function stopSttStatusPolling(): void {
  if (sttStatusTimer !== null) {
    window.clearInterval(sttStatusTimer);
    sttStatusTimer = null;
  }
}

function formatError(error: unknown): string {
  if (!error) return "not attempted";
  return error instanceof Error ? error.message : String(error);
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Missing element: ${id}`);
  }

  return element as T;
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
