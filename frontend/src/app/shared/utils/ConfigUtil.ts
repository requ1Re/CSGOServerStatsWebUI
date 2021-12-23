import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { Gamemode } from '../models/Gamemode';
import { Gameserver } from '../models/Gameserver';
import { NavbarItem } from '../models/NavbarItem';

export class ConfigUtil {
  public static GLOBALS: Globals = {
    SERVERS: [
      {
        name: 'RETAKES #1',
        gamemode: Gamemode.RETAKES,
        ip: '94.130.22.111:27015',
      },
      {
        name: 'KZ #1',
        gamemode: Gamemode.KZ,
        ip: '94.130.22.111:27016',
      },
      {
        name: 'SURF #1',
        gamemode: Gamemode.SURF,
        ip: '94.130.22.111:27017',
      },
    ],
    NAVBAR_ITEMS: [
      {
        name: 'Servers',
        url: ['/servers'],
        faIcon: faServer,
      },
      {
        name: 'Statistics',
        url: ['/stats'],
        faIcon: faChartBar,
      },
    ],
    API_BASE_URL: 'http://localhost:8000/v1',
  };

  public static getFlagImagePath(countryCode: string): string {
    return `assets/img/flags/${countryCode.toLowerCase()}.svg`;
  }
}

export interface Globals {
  SERVERS: Gameserver[];
  NAVBAR_ITEMS: NavbarItem[];
  API_BASE_URL: string;
}
