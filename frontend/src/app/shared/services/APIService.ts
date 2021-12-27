import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SurfLeaderboard, SurfMapLeaderboard } from '../models/SurfLeaderboard';
import { ConfigUtil } from '../utils/ConfigUtil';
import { ErrorService } from './ErrorService';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  private readonly apiBaseUrl: string = ConfigUtil.GLOBALS.API_BASE_URL;

  public getSurfLeaderboard(): Observable<SurfLeaderboard> {
    return this.http
      .get<SurfLeaderboard>(`${this.apiBaseUrl}/server/surf/leaderboard`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }

  public getSurfMapLeaderboard(mapName: string): Observable<SurfMapLeaderboard> {
    return this.http
      .get<SurfMapLeaderboard>(
        `${this.apiBaseUrl}/server/surf/leaderboard/map/${mapName}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.addError({ message: err.message });
          return throwError(err);
        })
      );
  }
}
