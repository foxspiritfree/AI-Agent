export function readPlayerResponseFromMainWorld(): unknown | null {
  const pageWindow = window as Window & {
    ytInitialPlayerResponse?: unknown;
    ytplayer?: { config?: { args?: { player_response?: string } } };
  };

  if (pageWindow.ytInitialPlayerResponse) {
    return pageWindow.ytInitialPlayerResponse;
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

