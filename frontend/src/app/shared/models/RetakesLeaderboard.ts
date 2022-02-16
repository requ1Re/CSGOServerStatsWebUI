import { APIWrapper } from './APIWrapper';

export namespace RetakesStats {
  export interface Leaderboard extends APIWrapper<LeaderboardData> {}

  export interface LeaderboardData {
    score: ScoreLeaderboardData[];
    kills: KillsLeaderboardData[];
    mvp: MvpLeaderboardData[];
    noscopeDistance: NoScopeDistanceLeaderboardData[];
  }

  export interface ScoreLeaderboardData extends DefaultPlayerData {
    score: number;
  }

  export interface KillsLeaderboardData extends DefaultPlayerData {
    kills: number;
  }

  export interface MvpLeaderboardData extends DefaultPlayerData {
    mvp: number;
  }

  export interface NoScopeDistanceLeaderboardData extends DefaultPlayerData {
    distance: number;
  }

  interface DefaultPlayerData {
    steamId: string;
    name: string;
  }
}
