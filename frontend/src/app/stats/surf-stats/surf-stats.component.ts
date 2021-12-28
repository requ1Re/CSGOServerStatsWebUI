import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import { FinishedMapsLeaderboardEntry, MapLeaderboard, PointsLeaderboardEntry, SurfLeaderboard, SurfMapLeaderboard } from 'src/app/shared/models/SurfLeaderboard';
import { APIService } from 'src/app/shared/services/APIService';
import { ConfigUtil } from 'src/app/shared/utils/ConfigUtil';
import * as lookup from 'country-code-lookup';
import { ErrorService } from 'src/app/shared/services/ErrorService';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';

@Component({
  selector: 'app-surf-stats',
  templateUrl: './surf-stats.component.html',
  styleUrls: ['./surf-stats.component.css'],
})
export class SurfStatsComponent extends StatsBaseComponent implements OnInit {
  surfLeaderboard: SurfLeaderboard;
  surfMapLeaderboard: SurfMapLeaderboard;

  maps: string[];

  viewTopTen = false;
  topTenMap: string;

  faTrophy = faTrophy;

  constructor(private api: APIService) {
    super();
  }

  ngOnInit(): void {
    this.register(
      this.api.getSurfLeaderboard().subscribe((leaderboard) => {
        this.surfLeaderboard = leaderboard;
        if (leaderboard && leaderboard.success && leaderboard.data) {
          this.maps = leaderboard.data.mapLeaderboard.map((map) => map.mapName);
        }
      })
    );
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
    this.register(
      this.api.getSurfMapLeaderboard(mapName).subscribe((leaderboard) => {
        this.surfMapLeaderboard = leaderboard;
      })
    );
  }

  getSpecificMapLeaderboardForDisplay(leaderboard: SurfMapLeaderboard|null): MapLeaderboard[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data;
    }
    return [];
  }
}
