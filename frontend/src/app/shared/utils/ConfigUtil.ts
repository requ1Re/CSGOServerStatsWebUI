import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faClipboardList, faServer } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FooterItem } from '../models/FooterItem';
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
        name: 'Leaderboards',
        url: ['/leaderboard'],
        faIcon: faClipboardList,
      },
    ],
    FOOTER_ITEMS: [
      {
        name: "1337Frankfurt.de",
        url: ["https://1337frankfurt.de"],
        external: true,
      },
      {
        name: "Imprint",
        url: ["https://1337frankfurt.de/impressum/"],
        external: true,
      },
      {
        name: "Bans",
        url: ["https://bans.require.lol"],
        external: true
      },
      {
        name: "Licenses",
        url: ["/info/license"],
        external: false
      }
    ],
    API_BASE_URL: environment.apiBaseUrl ?? '',
  };

  public static getFlagImagePath(countryCode: string): string {
    return `assets/img/flags/${countryCode.toLowerCase()}.svg`;
  }
}

export interface Globals {
  SERVERS: Gameserver[];
  NAVBAR_ITEMS: NavbarItem[];
  FOOTER_ITEMS: FooterItem[];
  API_BASE_URL: string;
}
