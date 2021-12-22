export interface SurfLeaderboard {
  mapRecords: MapRecord[];
  playerStats: PlayerStats[];
}

export interface MapRecord {
  steamid: string;
  mapname: string;
  name: string;
  runtimepro: number;
}

export interface PlayerStats {
  steamid: string;
  name: string;
  country: string;
  points: number;
  finishedmaps: number;
  lastseen: Date;
}
