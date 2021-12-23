import { Gamemode } from '../models/Gamemode';

export class GamemodeUtil {
  private static gamemodeImagePaths: Record<Gamemode, string> = {
    KZ: 'assets/img/kz.jpg',
    RETAKES: 'assets/img/retakes.jpg',
    SURF: 'assets/img/surf_utopia_v3.jpg',
  } as const;

  public static getGamemodeImagePath(gamemode: Gamemode): string {
    return this.gamemodeImagePaths[gamemode];
  }
}
