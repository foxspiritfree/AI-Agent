export function extractPlayerResponseFromText(text: string): unknown | null {
  const markers = ["ytInitialPlayerResponse", "ytplayer.config"];

  for (const marker of markers) {
    let searchFrom = 0;

    while (searchFrom < text.length) {
      const markerIndex = text.indexOf(marker, searchFrom);
      if (markerIndex === -1) break;

      const jsonStart = text.indexOf("{", markerIndex);
      if (jsonStart === -1) break;

      const jsonText = extractBalancedJsonObject(text, jsonStart);
      if (!jsonText) {
        searchFrom = markerIndex + marker.length;
        continue;
      }

      try {
        const parsed = JSON.parse(jsonText);
        const playerResponse = unwrapPossiblePlayerResponse(parsed);
        if (playerResponse) return playerResponse;
      } catch {
        searchFrom = markerIndex + marker.length;
        continue;
      }

      searchFrom = markerIndex + marker.length;
    }
  }

  return null;
}

export function unwrapPossiblePlayerResponse(value: unknown): unknown | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  if (hasCaptionTrackList(value)) {
    return value;
  }

  const maybeConfig = value as {
    args?: {
      player_response?: string;
      raw_player_response?: unknown;
    };
  };

  if (typeof maybeConfig.args?.player_response === "string") {
    try {
      const parsed = JSON.parse(maybeConfig.args.player_response);
      if (hasCaptionTrackList(parsed)) return parsed;
    } catch {
      return null;
    }
  }

  if (hasCaptionTrackList(maybeConfig.args?.raw_player_response)) {
    return maybeConfig.args?.raw_player_response ?? null;
  }

  return null;
}

function hasCaptionTrackList(value: unknown): boolean {
  const response = value as {
    captions?: {
      playerCaptionsTracklistRenderer?: {
        captionTracks?: unknown;
      };
    };
  };

  return Array.isArray(response?.captions?.playerCaptionsTracklistRenderer?.captionTracks);
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
