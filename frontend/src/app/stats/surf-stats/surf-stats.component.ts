import { Component, OnDestroy, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { FinishedMapsLeaderboardEntry, MapLeaderboard, PointsLeaderboardEntry, SurfLeaderboard, SurfMapLeaderboard } from 'src/app/shared/models/SurfLeaderboard';
import { APIService } from 'src/app/shared/services/APIService';
import { ConfigUtil } from 'src/app/shared/utils/ConfigUtil';
import * as lookup from 'country-code-lookup';
import { BaseComponent } from 'src/app/shared/components/base/base.component';

@Component({
  selector: 'app-surf-stats',
  templateUrl: './surf-stats.component.html',
  styleUrls: ['./surf-stats.component.css'],
})
export class SurfStatsComponent extends BaseComponent implements OnInit {
  surfLeaderboard$: Observable<SurfLeaderboard>;
  surfMapLeaderboard$: Observable<SurfMapLeaderboard>;

  maps: string[];

  viewTopTen = false;
  topTenMap: string;

  faTrophy = faTrophy;

  constructor(private api: APIService) {
    super();
  }

  ngOnInit(): void {
    this.surfLeaderboard$ = this.api.getSurfLeaderboard();

    this.register(this.surfLeaderboard$.subscribe((data => {
      if(data && data.success && data.data){
        this.maps = data.data.mapLeaderboard.map(map => map.mapName);
      }
    })));
  }

  getCountryFlagByName(countryName: string | undefined): string {
    const unknownCountryCode = 'xx';
    return ConfigUtil.getFlagImagePath(
      countryName
        ? lookup.byCountry(countryName)?.iso2 ?? unknownCountryCode
        : unknownCountryCode
    );
  }

  getPlaceColor(place: number): string {
    switch (place) {
      case 1:
        return 'gold';
      case 2:
        return 'darkgray';
      case 3:
        return '#bf8970';
      default:
        return 'white';
    }
  }

  getPlaceIcon(place: number): IconDefinition {
    switch (place) {
      case 1:
        return faTrophy;
      case 2:
      case 3:
        return faMedal;
      default:
        return faAward;
    }
  }

  getPointsLeaderboardForDisplay(leaderboard: SurfLeaderboard|null): PointsLeaderboardEntry[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.points;
    }
    return [];
  }

  getFinishedMapsLeaderboardForDisplay(leaderboard: SurfLeaderboard|null): FinishedMapsLeaderboardEntry[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.finishedMaps;
    }
    return [];
  }

  getMapLeaderboardForDisplay(leaderboard: SurfLeaderboard|null): MapLeaderboard[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.mapLeaderboard;
    }
    return [];
  }

  showMapLeaderboard(mapName: string) {
    this.topTenMap = mapName;
    this.viewTopTen = true;
    this.loadMapLeaderboard(mapName);
  }

  loadMapLeaderboard(mapName: string) {
    this.surfMapLeaderboard$ = this.api.getSurfMapLeaderboard(mapName);
  }

  getSpecificMapLeaderboardForDisplay(leaderboard: SurfMapLeaderboard|null): MapLeaderboard[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data;
    }
    return [];
  }

  formatTime(timeInSeconds: any) {
    let time: any = parseFloat(timeInSeconds).toFixed(3);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time - minutes * 60);
    let milliseconds = time.slice(-3);

    return (
      this.pad(minutes, 2) +
      ':' +
      this.pad(seconds, 2) +
      '.' +
      this.pad(milliseconds, 3)
    );
  }

  pad(num: any, size: any) {
    return ('000' + num).slice(size * -1);
  }
}
