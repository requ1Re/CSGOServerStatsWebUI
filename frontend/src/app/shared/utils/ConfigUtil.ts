import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faServer, faTable } from '@fortawesome/free-solid-svg-icons';
import { Gamemode } from '../models/Gamemode';
import { Gameserver } from '../models/Gameserver';
import { NavbarItem } from '../models/NavbarItem';

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
      },
    ],
    NAVBAR_ITEMS: [
      {
        name: 'Servers',
        url: ['/servers'],
        faIcon: faServer
      },
      {
        name: 'Statistics',
        url: ['/stats'],
        faIcon: faChartBar
      },
    ],
  };
}

export interface Globals {
  SERVERS: Gameserver[];
  NAVBAR_ITEMS: NavbarItem[];
}
