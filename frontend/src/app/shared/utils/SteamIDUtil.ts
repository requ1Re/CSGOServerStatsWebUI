export class SteamIDUtil {
  protected static readonly baseSteamId = BigInt(76561197960265728);

  // https://developer.valvesoftware.com/wiki/SteamID
  public static convertSteamIdToCommunityId(steamId: string): string {
    const split = steamId.split(':');
    const v = this.baseSteamId;
    const y = BigInt(split[1]);
    const z = BigInt(split[2]);

    const converted = y + z * 2n + v;
    return converted.toString();
  }
}
