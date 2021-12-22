import { Gamemode } from '../models/Gamemode';
import { Gameserver } from '../models/Gameserver';

export class ConfigUtil {
  public static GLOBALS: Globals = {
    SERVERS: [
      {
        name: 'Retakes #1',
        gamemode: Gamemode.RETAKES,
        ip: '94.130.22.111:27015',
      },
      {
        name: 'KZ #1',
        gamemode: Gamemode.KZ,
        ip: '94.130.22.111:27016',
      },
      {
        name: 'Surf #1',
        gamemode: Gamemode.SURF,
        ip: '94.130.22.111:27017',
      }
    ],
  };
}

export interface Globals {
  SERVERS: Gameserver[];
}
