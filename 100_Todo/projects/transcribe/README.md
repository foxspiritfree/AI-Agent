# YouTube Full Caption to Markdown

Personal Chrome extension for fetching full YouTube caption tracks and exporting them as Markdown.

## Development

```powershell
npm install
npm run check
```

Load the built extension from `dist/` in Chrome extension developer mode.

## MVP Scope

- YouTube watch pages only.
- Reads video info and caption tracks from the current page.
- Fetches a full caption track without waiting for playback.
- Falls back to manual speech-to-text recording for restricted/member videos.
- Formats transcript as AI prompt, timestamp list, or plain text.
- Copies Markdown or downloads it as `.md`.
- Does not use YouTube Data API, login, or backend.

## Speech-to-text Fallback

Use this when YouTube does not expose usable caption or transcript endpoints.

1. Click the extension icon to toggle the in-page panel.
2. Click `抓取字幕 Markdown` for normal caption extraction.
3. If captions are unavailable, choose `Gemini` or `OpenAI` in the panel.
4. Enter the matching API key.
5. Play the YouTube video.
6. Click `開始語音轉文字`.
7. Click `停止並轉錄` after the section you want has played.
8. Copy the generated Markdown.

Implementation notes:

- Uses `chrome.tabCapture.getMediaStreamId()` and an offscreen document.
- Preserves tab audio playback by routing captured audio through `AudioContext`.
- Gemini provider sends inline audio to `gemini-2.5-flash:generateContent`.
- OpenAI provider sends audio to `https://api.openai.com/v1/audio/transcriptions` with `gpt-4o-mini-transcribe`.
- Recording status is stored in `chrome.storage.session` so the service worker can recover after MV3 suspension.

## Verified Cases

- `https://www.youtube.com/watch?v=X99h_qBDe6A`
  - Page `captionTracks[].baseUrl` and direct `timedtext` returned `200 OK` with an empty body.
  - `youtubei/v1/get_transcript` returned `400 Precondition check failed`.
  - Working fallback: `youtubei/v1/player` with Android/iOS client context, then fetch the fresh caption URL as `fmt=json3`.

## Debug Notes

- If captions are detected but fetch returns an empty body, test the Android/iOS Innertube player fallback before assuming the video has no captions.
- The extension also listens for real YouTube player `timedtext` requests via `chrome.webRequest`. This can capture URLs containing session-only subtitle parameters such as `pot` / `potc`.
- When direct caption extraction fails, the popup attempts to trigger caption playback, waits briefly, then retries with captured `timedtext` URLs before falling back to STT.
- After rebuilding, reload the unpacked extension from Chrome Extensions and refresh the YouTube watch page.
