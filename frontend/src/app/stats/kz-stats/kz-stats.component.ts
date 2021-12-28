import { Component, OnInit } from '@angular/core';
import { StatsBaseComponent } from 'src/app/shared/components/stats-base/stats-base.component';
import { KZStats } from 'src/app/shared/models/KZLeaderboard';
import { APIService } from 'src/app/shared/services/APIService';

@Component({
  selector: 'app-kz-stats',
  templateUrl: './kz-stats.component.html',
  styleUrls: ['./kz-stats.component.css'],
})
export class KzStatsComponent extends StatsBaseComponent implements OnInit {
  kzLeaderboard: KZStats.Leaderboard;

  constructor(private api: APIService) {
    super();
  }

  ngOnInit(): void {
    this.register(
      this.api.getKZLeaderboard().subscribe((leaderboard) => {
        this.kzLeaderboard = leaderboard;
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

  getMapTPLeaderboardForDisplay(leaderboard: KZStats.Leaderboard|null): KZStats.MapLeaderboardTPData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.mapLeaderboard.tp;
    }
    return [];
  }

  getMapProLeaderboardForDisplay(leaderboard: KZStats.Leaderboard|null): KZStats.MapLeaderboardProData[] {
    if(leaderboard && leaderboard.success && leaderboard.data){
      return leaderboard.data.mapLeaderboard.pro;
    }
    return [];
  }
}
