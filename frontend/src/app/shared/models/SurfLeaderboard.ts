export interface SurfLeaderboard {
  mapLeaderboard: MapLeaderboardEntry[];
  playerLeaderboard: PlayerLeaderboardEntry[];
}

export interface MapLeaderboardEntry {
  steamid: string;
  mapname: string;
  name: string;
  runtimepro: number;
}

export interface PlayerLeaderboardEntry {
  steamid: string;
  name: string;
  country: string;
  points: number;
  finishedmaps: number;
  lastseen: Date;
}
