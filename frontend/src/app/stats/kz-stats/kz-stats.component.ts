import { Component, OnInit } from '@angular/core';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';
import { KZStats } from 'src/app/shared/models/KZLeaderboard';
import { APIService } from 'src/app/shared/services/APIService';
import { PaginationUtil } from 'src/app/shared/utils/PaginationUtil';

@Component({
  selector: 'app-kz-stats',
  templateUrl: './kz-stats.component.html',
  styleUrls: ['./kz-stats.component.css'],
})
export class KzStatsComponent extends StatsBaseComponent implements OnInit {
  kzLeaderboard: KZStats.Leaderboard;

  mapProLeaderboardPaginationUtil = new PaginationUtil<KZStats.MapLeaderboardProData[]>([]);
  mapTPLeaderboardPaginationUtil = new PaginationUtil<KZStats.MapLeaderboardTPData[]>([]);

  constructor(private api: APIService) {
    super();
  }

  ngOnInit(): void {
    this.register(
      this.api.getKZLeaderboard().subscribe((leaderboard) => {
        this.kzLeaderboard = leaderboard;
        if(leaderboard && leaderboard.success && leaderboard.data){
          this.mapTPLeaderboardPaginationUtil.setData(leaderboard.data.mapLeaderboard.tp);
          this.mapProLeaderboardPaginationUtil.setData(leaderboard.data.mapLeaderboard.pro);
        }
      })
    );
  }

  getPointsLeaderboardForDisplay(leaderboard: KZStats.Leaderboard|null): KZStats.PlayerLeaderboardPointsData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.points;
    }
    return [];
  }

  getFinishedMapsLeaderboardForDisplay(leaderboard: KZStats.Leaderboard|null): KZStats.PlayerLeaderboardFinishedMapsData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.playerLeaderboard.finishedMaps;
    }
    return [];
  }
}
