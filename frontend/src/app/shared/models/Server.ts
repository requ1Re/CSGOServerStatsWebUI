import { APIWrapper } from './APIWrapper';
import { Gamemode } from './Gamemode';

export namespace ServerAPI {
  export interface ServerList extends APIWrapper<GameServer[]> {}

  export interface GameServer {
    name: string;
    ip: string;
    gamemode: Gamemode;
    queryInfo?: QueryInfo;
    status: Status;
  }

  export interface QueryInfo {
    hostname: string;
    map: Map;
    players: number;
    maxPlayers: number;
  }

  export interface Map {
    name: string;
    workshop: boolean;
    preview?: string;
  }

  export enum Status {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
  }
}
