const OFFSCREEN_DOCUMENT_PATH = "offscreen.html";
const STT_STATUS_KEY = "sttStatus";
const STT_LAST_RESULT_KEY = "sttLastResult";

type SttStatus = "idle" | "recording" | "transcribing";

let creatingOffscreenDocument: Promise<void> | null = null;
const capturedCaptionUrlsByTab = new Map<number, string[]>();

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;

  void togglePanel(tab.id);
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (typeof details.tabId !== "number" || details.tabId < 0) return;

    const urls = capturedCaptionUrlsByTab.get(details.tabId) ?? [];
    const nextUrls = [details.url, ...urls.filter((url) => url !== details.url)].slice(0, 10);
    capturedCaptionUrlsByTab.set(details.tabId, nextUrls);
  },
  { urls: ["https://www.youtube.com/api/timedtext*"] }
);

chrome.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
  if (!isObject(message)) return false;

  if (message.type === "CAPTION_GET_CAPTURED_URLS") {
    const tabId = Number(message.tabId);
    sendResponse({ ok: true, data: { urls: capturedCaptionUrlsByTab.get(tabId) ?? [] } });
    return false;
  }

  if (message.type === "CAPTION_CLEAR_CAPTURED_URLS") {
    const tabId = Number(message.tabId);
    capturedCaptionUrlsByTab.delete(tabId);
    sendResponse({ ok: true, data: true });
    return false;
  }

  if (message.type === "STT_GET_STATUS") {
    void Promise.all([getSttStatus(), getLastSttResult()]).then(([status, lastResult]) =>
      sendResponse({ ok: true, data: { status, lastResult } })
    );
    return true;
  }

  if (message.type === "STT_START_RECORDING") {
    void startRecording(Number(message.tabId || sender.tab?.id))
      .then(() => sendResponse({ ok: true, data: { status: "recording" } }))
      .catch((error) => sendResponse({ ok: false, error: formatError(error) }));
    return true;
  }

  if (message.type === "STT_STOP_AND_TRANSCRIBE") {
    void stopAndTranscribe(String(message.apiKey ?? ""), String(message.provider ?? "gemini"))
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: formatError(error) }))
      .finally(() => {
        void setSttStatus("idle");
      });
    return true;
  }

  return false;
});

async function startRecording(tabId: number): Promise<void> {
  if (!tabId || Number.isNaN(tabId)) {
    throw new Error("找不到目前分頁。");
  }

  const currentStatus = await getSttStatus();
  if (currentStatus !== "idle") {
    throw new Error("已有語音轉文字錄音正在進行。");
  }

  await setSttStatus("recording");
  await chrome.storage.session.remove(STT_LAST_RESULT_KEY);

  await ensureOffscreenDocument();
  try {
    const streamId = await getMediaStreamId(tabId);
    await sendOffscreenMessage({ type: "OFFSCREEN_START_RECORDING", streamId });
  } catch (error) {
    await setSttStatus("idle");
    throw error;
  }
}

async function stopAndTranscribe(apiKey: string, provider: string): Promise<{ text: string; recordedAt: string }> {
  if (!apiKey.trim()) {
    throw new Error("請先輸入 API key。");
  }

  await setSttStatus("transcribing");
  const result = await sendOffscreenMessage<{ text: string; recordedAt: string }>({
    type: "OFFSCREEN_STOP_AND_TRANSCRIBE",
    apiKey,
    provider
  });
  await chrome.storage.session.set({
    [STT_LAST_RESULT_KEY]: {
      ...result,
      id: `${Date.now()}`
    }
  });
  await closeOffscreenDocument();
  return result;
}

async function togglePanel(tabId: number): Promise<void> {
  try {
    await chrome.tabs.sendMessage(tabId, { type: "TRANSCRIBE_TOGGLE_PANEL" });
  } catch {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["youtubePageExtractor.js"]
    });
    await chrome.tabs.sendMessage(tabId, { type: "TRANSCRIBE_TOGGLE_PANEL" });
  }
}

async function getSttStatus(): Promise<SttStatus> {
  const data = await chrome.storage.session.get(STT_STATUS_KEY);
  const status = data[STT_STATUS_KEY];
  return status === "recording" || status === "transcribing" ? status : "idle";
}

async function setSttStatus(status: SttStatus): Promise<void> {
  await chrome.storage.session.set({ [STT_STATUS_KEY]: status });
}

async function getLastSttResult(): Promise<{ id: string; text: string; recordedAt: string } | null> {
  const data = await chrome.storage.session.get(STT_LAST_RESULT_KEY);
  const result = data[STT_LAST_RESULT_KEY];

  if (
    isObject(result) &&
    typeof result.id === "string" &&
    typeof result.text === "string" &&
    typeof result.recordedAt === "string"
  ) {
    return result as { id: string; text: string; recordedAt: string };
  }

  return null;
}

async function ensureOffscreenDocument(): Promise<void> {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  const existingContexts = await getExtensionContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) return;

  if (!creatingOffscreenDocument) {
    creatingOffscreenDocument = chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: ["USER_MEDIA" as chrome.offscreen.Reason],
      justification: "Record the active tab audio for speech-to-text fallback."
    });
  }

  await creatingOffscreenDocument;
  creatingOffscreenDocument = null;
}

async function closeOffscreenDocument(): Promise<void> {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  const existingContexts = await getExtensionContexts({
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [offscreenUrl]
  });

  if (existingContexts.length > 0) {
    await chrome.offscreen.closeDocument();
  }
}

async function sendOffscreenMessage<T>(message: Record<string, unknown>): Promise<T> {
  const response = await chrome.runtime.sendMessage(message);
  if (!isExtensionResponse<T>(response)) {
    throw new Error("Offscreen document 沒有回應。");
  }
  if (!response.ok) {
    throw new Error(response.error);
  }
  return response.data;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

type ExtensionResponse<T> = { ok: true; data: T } | { ok: false; error: string };

function isExtensionResponse<T>(value: unknown): value is ExtensionResponse<T> {
  return isObject(value) && "ok" in value && typeof value.ok === "boolean";
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function getExtensionContexts(filter: {
  contextTypes: string[];
  documentUrls: string[];
}): Promise<chrome.runtime.ExtensionContext[]> {
  return (chrome.runtime as any).getContexts(filter);
}

function getMediaStreamId(tabId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(streamId);
    });
  });
}

export {};
