import { Component, OnInit } from '@angular/core';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';
import { KZStats } from 'src/app/shared/models/KZLeaderboard';
import { APIService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UserDataService } from 'src/app/shared/services/userdata.service';
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

  constructor(private api: APIService, userDataService: UserDataService, loadingService: LoadingService) {
    super(userDataService, loadingService);
  }

  ngOnInit(): void {
    this.showLoadingSpinner(true);
    this.register(
      this.api.getKZLeaderboard().subscribe((leaderboard) => {
        this.kzLeaderboard = leaderboard;
        if(leaderboard && leaderboard.success && leaderboard.data){
          this.mapTPLeaderboardPaginationUtil.setData(leaderboard.data.mapLeaderboard.tp);
          this.mapProLeaderboardPaginationUtil.setData(leaderboard.data.mapLeaderboard.pro);

          this.loadUserNames(leaderboard);
          this.showLoadingSpinner(false);
        }
      })
    );
  }


  async loadUserNames(leaderboard: KZStats.Leaderboard) {
    await this.userDataService.requestUserData(leaderboard.data!.mapLeaderboard.tp.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.mapLeaderboard.pro.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.playerLeaderboard.points.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.playerLeaderboard.finishedMaps.map(x => x.steamId));
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
