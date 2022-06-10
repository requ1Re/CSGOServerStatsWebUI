import { faClipboardList, faServer } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { FooterItem } from '../models/FooterItem';
import { NavbarItem } from '../models/NavbarItem';

export class ConfigUtil {
  public static GLOBALS: Globals = {
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
  NAVBAR_ITEMS: NavbarItem[];
  FOOTER_ITEMS: FooterItem[];
  API_BASE_URL: string;
}
