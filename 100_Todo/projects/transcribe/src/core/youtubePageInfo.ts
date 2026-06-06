import type { VideoInfo } from "../types/transcript";

export function isYouTubeWatchUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") &&
      parsed.pathname === "/watch" &&
      Boolean(parsed.searchParams.get("v"))
    );
  } catch {
    return false;
  }
}

export function getVideoIdFromUrl(url: string): string | null {
  try {
    return new URL(url).searchParams.get("v");
  } catch {
    return null;
  }
}

export function getPageTitle(): string {
  const title =
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ||
    document.querySelector<HTMLHeadingElement>("h1 yt-formatted-string")?.textContent ||
    document.title;

  return title.replace(/\s+-\s+YouTube$/, "").trim() || "Untitled YouTube Video";
}

export function getCurrentVideoInfo(): VideoInfo {
  const videoId = getVideoIdFromUrl(location.href);

  if (!videoId) {
    throw new Error("目前分頁不是可支援的 YouTube watch 頁。");
  }

  return {
    videoId,
    title: getPageTitle(),
    url: location.href,
    capturedAt: new Date().toISOString()
  };
}

