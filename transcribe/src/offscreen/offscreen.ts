let mediaRecorder: MediaRecorder | null = null;
let mediaStream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let chunks: Blob[] = [];

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (!isObject(message)) return false;

  if (message.type === "OFFSCREEN_START_RECORDING") {
    void startRecording(String(message.streamId ?? ""))
      .then(() => sendResponse({ ok: true, data: true }))
      .catch((error) => sendResponse({ ok: false, error: formatError(error) }));
    return true;
  }

  if (message.type === "OFFSCREEN_STOP_AND_TRANSCRIBE") {
    void stopAndTranscribe(String(message.apiKey ?? ""), String(message.provider ?? "gemini"))
      .then((data) => sendResponse({ ok: true, data }))
      .catch((error) => sendResponse({ ok: false, error: formatError(error) }));
    return true;
  }

  return false;
});

async function startRecording(streamId: string): Promise<void> {
  if (!streamId) {
    throw new Error("缺少 tab audio stream ID。");
  }

  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    throw new Error("錄音已在進行中。");
  }

  chunks = [];
  mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: "tab",
        chromeMediaSourceId: streamId
      }
    } as MediaTrackConstraints,
    video: false
  });

  audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(mediaStream);
  source.connect(audioContext.destination);

  mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: chooseMimeType()
  });
  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  });
  mediaRecorder.start();
}

async function stopAndTranscribe(apiKey: string, provider: string): Promise<{ text: string; recordedAt: string }> {
  if (!mediaRecorder || mediaRecorder.state === "inactive") {
    throw new Error("目前沒有錄音。");
  }

  const mimeType = mediaRecorder.mimeType || "audio/webm";
  const blob = await stopRecorder();
  stopStream();

  const file = new File([blob], `youtube-tab-audio.${mimeType.includes("mp4") ? "mp4" : "webm"}`, { type: mimeType });
  const text = provider === "openai" ? await transcribeWithOpenAI(apiKey, file) : await transcribeWithGemini(apiKey, file);

  return {
    text,
    recordedAt: new Date().toISOString()
  };
}

async function transcribeWithOpenAI(apiKey: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("model", "gpt-4o-mini-transcribe");
  formData.append("response_format", "json");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `OpenAI transcription HTTP ${response.status}`);
  }

  return String(data.text || "").trim();
}

async function transcribeWithGemini(apiKey: string, file: File): Promise<string> {
  const base64Audio = await blobToBase64(file);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Transcribe this audio into clean Traditional Chinese if the speech is Chinese, otherwise preserve the spoken language. Return only the transcript text."
              },
              {
                inline_data: {
                  mime_type: file.type || "audio/webm",
                  data: base64Audio
                }
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini transcription HTTP ${response.status}`);
  }

  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text ?? "")
      .join("")
      .trim() || ""
  );
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    });
    reader.addEventListener("error", () => reject(reader.error || new Error("音訊轉 base64 失敗。")));
    reader.readAsDataURL(blob);
  });
}

function stopRecorder(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (!mediaRecorder) {
      reject(new Error("MediaRecorder 尚未啟動。"));
      return;
    }

    mediaRecorder.addEventListener(
      "stop",
      () => {
        resolve(new Blob(chunks, { type: mediaRecorder?.mimeType || "audio/webm" }));
      },
      { once: true }
    );
    mediaRecorder.stop();
  });
}

function stopStream(): void {
  mediaStream?.getTracks().forEach((track) => track.stop());
  mediaStream = null;
  void audioContext?.close();
  audioContext = null;
  mediaRecorder = null;
}

function chooseMimeType(): string {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  return candidates.find((candidate) => MediaRecorder.isTypeSupported(candidate)) || "";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export {};
