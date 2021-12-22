import { APIWrapper } from './APIWrapper';

export interface PlayerStats extends APIWrapper<PlayerStatsData> {}

export interface PlayerStatsData {
  name: string;
  country: string;
  points: number;
  finishedMaps: number;
  bestMapTimes: BestMapTime[];
}

export interface BestMapTime {
  mapName: string;
  time: number;
}
