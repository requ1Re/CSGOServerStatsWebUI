import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIWrapper } from '../models/APIWrapper';
import { SurfLeaderboard } from '../models/SurfLeaderboard';
import { ConfigUtil } from '../utils/ConfigUtil';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  private readonly apiBaseUrl: string = ConfigUtil.GLOBALS.API_BASE_URL;

  public getSurfLeaderboard(): Observable<SurfLeaderboard> {
    return this.http.get<SurfLeaderboard>(
      `${this.apiBaseUrl}/server/surf/leaderboard`
    );
  }
}
