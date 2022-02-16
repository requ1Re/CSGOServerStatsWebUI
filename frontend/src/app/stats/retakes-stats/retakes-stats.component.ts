import { Component, OnInit } from '@angular/core';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';
import { RetakesStats } from 'src/app/shared/models/RetakesLeaderboard';
import { APIService } from 'src/app/shared/services/api.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UserDataService } from 'src/app/shared/services/userdata.service';

@Component({
  selector: 'app-retakes-stats',
  templateUrl: './retakes-stats.component.html',
  styleUrls: ['./retakes-stats.component.css']
})
export class RetakesStatsComponent extends StatsBaseComponent implements OnInit {
  retakesLeaderboard: RetakesStats.Leaderboard;

  constructor(private api: APIService, userDataService: UserDataService, loadingService: LoadingService) {
    super(userDataService, loadingService);
  }

  ngOnInit(): void {
    this.showLoadingSpinner(true);
    this.register(
      this.api.getRetakesLeaderboard().subscribe((leaderboard) => {
        this.retakesLeaderboard = leaderboard;
        if(leaderboard && leaderboard.success && leaderboard.data){
          this.loadUserNames(leaderboard);
          this.showLoadingSpinner(false);
        }
      })
    );
  }

  async loadUserNames(leaderboard: RetakesStats.Leaderboard) {
    await this.userDataService.requestUserData(leaderboard.data!.score.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.kills.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.mvp.map(x => x.steamId));
    await this.userDataService.requestUserData(leaderboard.data!.noscopeDistance.map(x => x.steamId));
  }

  getScoreLeaderboardForDisplay(leaderboard: RetakesStats.Leaderboard|null): RetakesStats.ScoreLeaderboardData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.score;
    }
    return [];
  }

  getKillsLeaderboardForDisplay(leaderboard: RetakesStats.Leaderboard|null): RetakesStats.KillsLeaderboardData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.kills;
    }
    return [];
  }

  getMvpLeaderboardForDisplay(leaderboard: RetakesStats.Leaderboard|null): RetakesStats.MvpLeaderboardData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.mvp;
    }
    return [];
  }

  getNoScopeDistanceLeaderboardForDisplay(leaderboard: RetakesStats.Leaderboard|null): RetakesStats.NoScopeDistanceLeaderboardData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.noscopeDistance;
    }
    return [];
  }

  unitsToMeters(units: number){
    return Math.round(units * 1.905 / 100);
  }
}
