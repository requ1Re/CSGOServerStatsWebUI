import { APIWrapper } from "./APIWrapper";
import { Gamemode } from "./Gamemode";

export namespace ServerAPI {
  export interface ServerList extends APIWrapper<GameServer[]> {}

  export interface GameServer {
    name: string;
    ip: string;
    gamemode: Gamemode;
    queryInfo: QueryInfo;
  }

  export interface QueryInfo {
    hostname: string;
    map: string;
    players: number;
    maxPlayers: number;
  }
}
