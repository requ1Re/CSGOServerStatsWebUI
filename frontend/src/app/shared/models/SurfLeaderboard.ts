import { APIWrapper } from './APIWrapper';

export interface SurfLeaderboard extends APIWrapper<SurfLeaderboardData> {}
export interface SurfMapLeaderboard extends APIWrapper<MapLeaderboard> {}

export interface SurfLeaderboardData {
  mapLeaderboard: MapLeaderboard[];
  playerLeaderboard: PlayerLeaderboard;
}

export interface MapLeaderboard extends DefaultPlayerData {
  mapName: string;
  time: number;
}

export interface PlayerLeaderboard {
  points: PointsLeaderboardEntry[];
  finishedMaps: FinishedMapsLeaderboardEntry[];
}

export interface PointsLeaderboardEntry extends DefaultPlayerData {
  points: number;
}

export interface FinishedMapsLeaderboardEntry extends DefaultPlayerData {
  finishedMaps: number;
}

interface DefaultPlayerData {
  steamId: string;
  name: string;
  country?: string;
}
