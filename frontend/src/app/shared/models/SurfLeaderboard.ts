export interface SurfLeaderboard {
  mapLeaderboard: MapLeaderboard[];
  playerLeaderboard: PlayerLeaderboard;
}

export interface MapLeaderboard extends DefaultPlayerData {
  mapname: string;
  runtimepro: number;
}

export interface PlayerLeaderboard {
  points: PointsLeaderboardEntry[];
  finishedMaps: FinishedMapsLeaderboardEntry[];
}

export interface PointsLeaderboardEntry extends DefaultPlayerData {
  points: number;
}

export interface FinishedMapsLeaderboardEntry extends DefaultPlayerData {
  finishedmapspro: number;
}

interface DefaultPlayerData {
  steamid: string;
  name: string;
  country?: string;
}
