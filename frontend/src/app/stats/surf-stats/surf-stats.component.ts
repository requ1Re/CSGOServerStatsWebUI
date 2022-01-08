import { Component, OnInit } from '@angular/core';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { APIService } from 'src/app/shared/services/APIService';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';
import { SurfStats } from 'src/app/shared/models/SurfLeaderboard';
import { PaginationUtil } from 'src/app/shared/utils/PaginationUtil';

@Component({
  selector: 'app-surf-stats',
  templateUrl: './surf-stats.component.html',
  styleUrls: ['./surf-stats.component.css'],
})
export class SurfStatsComponent extends StatsBaseComponent implements OnInit {
  surfLeaderboard: SurfStats.Leaderboard;
  surfMapLeaderboard: SurfStats.MapLeaderboard;

  mapLeaderboardPaginationUtil = new PaginationUtil<SurfStats.MapLeaderboardData[]>([]);
  
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
          this.mapLeaderboardPaginationUtil.setData(leaderboard.data.mapLeaderboard);
        }
      })
    );
  }

  getPointsLeaderboardForDisplay(leaderboard: SurfStats.Leaderboard|null): SurfStats.PointsLeaderboardEntry[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.points;
    }
    return [];
  }

  getFinishedMapsLeaderboardForDisplay(leaderboard: SurfStats.Leaderboard|null): SurfStats.FinishedMapsLeaderboardEntry[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.finishedMaps;
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

  getSpecificMapLeaderboardForDisplay(leaderboard: SurfStats.MapLeaderboard|null): SurfStats.MapLeaderboardData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data;
    }
    return [];
  }
}
