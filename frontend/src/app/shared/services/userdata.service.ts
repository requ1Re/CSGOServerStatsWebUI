import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { APIWrapper } from '../models/APIWrapper';
import { UserData } from '../models/UserData';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private apiService: APIService) {}

  public userDataCache: UserData[] = [];

  public async requestUserData(steamIds: string[]) {
    const steamIdsToRequest = steamIds.filter(
      (steamId: string) =>
        !this.userDataCache.find((user: UserData) => user.steamId === steamId)
    );
    if (steamIdsToRequest.length > 0) {
      console.log('[UserDataService] Requesting: ', steamIdsToRequest);

      const chunks = this.chunk(steamIdsToRequest, 100);
      console.log('[UserDataService] Requests split into chunks: ', chunks);

      for (const chunk of chunks) {
        const response = await this.apiService
          .getUsers(chunk)
          .toPromise();

        if (response.success && response.data) {
          console.log(
            '[UserDataService] Adding data to cache: ',
            response.data
          );
          this.userDataCache = [...this.userDataCache, ...response.data];
        }
      }
    }
  }

  public getUserNameFromCache(steamId: string, defaultValue: string = steamId) {
    const userData = this.userDataCache.find(
      (user: UserData) => user.steamId === steamId
    );

    return userData ? userData.username : defaultValue;
  }

  private chunk(array: any[], chunkSize: number) {
    var myArray = [];
    for (var i = 0; i < array.length; i += chunkSize) {
      myArray.push(array.slice(i, i + chunkSize));
    }
    return myArray;
  }
}
