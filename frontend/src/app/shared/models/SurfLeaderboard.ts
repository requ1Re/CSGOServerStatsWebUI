import { APIWrapper } from './APIWrapper';

export namespace SurfStats {
  export interface Leaderboard extends APIWrapper<LeaderboardData> {}
  export interface MapLeaderboard extends APIWrapper<MapLeaderboardData[]> {}

  export interface LeaderboardData {
    mapLeaderboard: MapLeaderboardData[];
    playerLeaderboard: PlayerLeaderboardData;
  }

  export interface MapLeaderboardData extends DefaultPlayerData {
    mapName: string;
    time: number;
  }

  export interface PlayerLeaderboardData {
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
}
