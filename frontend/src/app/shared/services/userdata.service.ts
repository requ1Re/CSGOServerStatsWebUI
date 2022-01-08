import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { APIWrapper } from '../models/APIWrapper';
import { UserData } from '../models/UserData';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private apiService: APIService) {}

  public userDataCache: UserData[] = [];

  public requestUserData(steamIds: string[]): Observable<UserData[]> {
    return this.apiService.getUsers(steamIds).pipe(
      tap((response: APIWrapper<UserData[]>) => {
        if (response.success && response.data) {
          this.userDataCache = [...this.userDataCache, ...response.data];
        }
      }),
      map((response: APIWrapper<UserData[]>) => {
        return response.data ?? [];
      })
    );
  }

  public getUserNameFromCache(steamId: string, defaultValue: string = steamId) {
    const userData = this.userDataCache.find(
      (user: UserData) => user.steamId === steamId
    );

    return userData ? userData.username : defaultValue;
  }
}
