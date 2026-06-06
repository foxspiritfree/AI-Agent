import type { FetchedCaption } from "./captionFetcher";
import type { TranscriptSegment } from "../types/transcript";

type Json3Event = {
  tStartMs?: number;
  dDurationMs?: number;
  segs?: Array<{ utf8?: string }>;
};

export function parseCaptionResponse(caption: FetchedCaption, languageCode?: string): TranscriptSegment[] {
  if (caption.format === "json3") {
    return parseJson3(caption.raw, languageCode);
  }

  if (caption.format === "vtt") {
    return parseVtt(caption.raw, languageCode);
  }

  return parseXmlCaption(caption.raw, languageCode);
}

export function parseJson3(raw: string, languageCode?: string): TranscriptSegment[] {
  const data = JSON.parse(raw) as { events?: Json3Event[] };

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

export function parseXmlCaption(raw: string, languageCode?: string): TranscriptSegment[] {
  const doc = new DOMParser().parseFromString(raw, "text/xml");
  const parserError = doc.querySelector("parsererror");

  if (parserError) {
    throw new Error("字幕 XML 解析失敗。");
  }

  const nodes = Array.from(doc.querySelectorAll("text"));

  return nodes
    .map((node) => ({
      startSec: Number(node.getAttribute("start") || 0),
      durationSec: node.hasAttribute("dur") ? Number(node.getAttribute("dur")) : null,
      text: (node.textContent || "").trim(),
      source: "caption-track" as const,
      languageCode
    }))
    .filter((segment) => segment.text);
}

export function parseVtt(raw: string, languageCode?: string): TranscriptSegment[] {
  const blocks = raw
    .replace(/\r/g, "")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block): TranscriptSegment | null => {
      const lines = block.split("\n").filter(Boolean);
      const timeLineIndex = lines.findIndex((line) => line.includes("-->"));
      if (timeLineIndex === -1) return null;

      const [startRaw, endRaw] = lines[timeLineIndex].split("-->").map((part) => part.trim().split(/\s+/)[0]);
      const startSec = parseVttTimestamp(startRaw);
      const endSec = parseVttTimestamp(endRaw);
      const text = lines
        .slice(timeLineIndex + 1)
        .map(stripVttTags)
        .join(" ")
        .trim();

      if (!text) return null;

      return {
        startSec,
        durationSec: endSec > startSec ? endSec - startSec : null,
        text,
        source: "caption-track",
        languageCode
      };
    })
    .filter((segment): segment is TranscriptSegment => Boolean(segment));
}

function parseVttTimestamp(value: string): number {
  const parts = value.split(":");
  const secondsPart = parts.pop() ?? "0";
  const seconds = Number(secondsPart.replace(",", "."));
  const minutes = Number(parts.pop() ?? 0);
  const hours = Number(parts.pop() ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
}

function stripVttTags(text: string): string {
  return text.replace(/<[^>]+>/g, "");
}

