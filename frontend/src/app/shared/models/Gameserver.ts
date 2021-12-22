import { Gamemode } from './Gamemode';

export interface Gameserver {
  name: string;
  gamemode: Gamemode;
  ip: string;
}
