import type { CaptionTrack } from "../types/transcript";

export interface FetchedCaption {
  raw: string;
  format: "json3" | "xml" | "srv3" | "vtt" | "unknown";
}

const FETCH_ATTEMPTS: Array<{ format: FetchedCaption["format"]; fmt: string | null }> = [
  { format: "json3", fmt: "json3" },
  { format: "unknown", fmt: null },
  { format: "srv3", fmt: "srv3" },
  { format: "vtt", fmt: "vtt" }
];

export async function fetchCaptionTrack(track: CaptionTrack): Promise<FetchedCaption> {
  const errors: string[] = [];

  for (const attempt of FETCH_ATTEMPTS) {
    const url = new URL(track.baseUrl);

    if (attempt.fmt) {
      url.searchParams.set("fmt", attempt.fmt);
    }

    try {
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
    } catch (error) {
      errors.push(`${attempt.format}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`字幕抓取失敗：${errors.join("; ")}`);
}

function inferCaptionFormat(raw: string): FetchedCaption["format"] {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith("{")) return "json3";
  if (trimmed.startsWith("WEBVTT")) return "vtt";
  if (trimmed.startsWith("<")) return "xml";
  return "unknown";
}
