import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIWrapper } from '../models/APIWrapper';
import { KZStats } from '../models/KZLeaderboard';
import { SurfStats } from '../models/SurfLeaderboard';
import { UserData } from '../models/UserData';
import { ConfigUtil } from '../utils/ConfigUtil';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private readonly apiBaseUrl: string = ConfigUtil.GLOBALS.API_BASE_URL;

  public getSurfLeaderboard(): Observable<SurfStats.Leaderboard> {
    return this.http
      .get<SurfStats.Leaderboard>(`${this.apiBaseUrl}/server/surf/leaderboard`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }

  public getSurfMapLeaderboard(mapName: string): Observable<SurfStats.MapLeaderboard> {
    return this.http
      .get<SurfStats.MapLeaderboard>(
        `${this.apiBaseUrl}/server/surf/leaderboard/map/${mapName}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }

  public getKZLeaderboard(): Observable<KZStats.Leaderboard> {
    return this.http
      .get<KZStats.Leaderboard>(`${this.apiBaseUrl}/server/kz/leaderboard`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }

  public getUsers(steamIds: string[]): Observable<APIWrapper<UserData[]>> {
    return this.http
      .get<APIWrapper<UserData[]>>(`${this.apiBaseUrl}/users/${steamIds.join(',')}`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }
}
