import { APIWrapper } from './APIWrapper';

export namespace KZStats {
  export interface Leaderboard extends APIWrapper<LeaderboardData> {}

  export interface LeaderboardData {
    mapLeaderboard: MapLeaderboardData;
    playerLeaderboard: PlayerLeaderboardData;
  }

  export interface MapLeaderboardData {
    tp: MapLeaderboardTPData[];
    pro: MapLeaderboardProData[];
  }

  export interface MapLeaderboardTPData extends DefaultPlayerData {
    mapName: string;
    time: number;
    teleports: number;
  }

  export interface MapLeaderboardProData extends DefaultPlayerData {
    mapName: string;
    time: number;
  }

  export interface PlayerLeaderboardData {
    points: PlayerLeaderboardPointsData[];
    finishedMaps: PlayerLeaderboardFinishedMapsData[];
  }

  export interface PlayerLeaderboardPointsData extends DefaultPlayerData {
    points: number;
  }

  export interface PlayerLeaderboardFinishedMapsData extends DefaultPlayerData {
    finishedMaps: number;
    finishedMapsTP: number;
    finishedMapsPro: number;
  }

  export interface DefaultPlayerData {
    steamId: string;
    name: string;
    country?: string;
  }
}
