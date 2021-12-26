import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { SurfLeaderboard } from 'src/app/shared/models/SurfLeaderboard';
import { APIService } from 'src/app/shared/services/APIService';
import { ConfigUtil } from 'src/app/shared/utils/ConfigUtil';
import * as lookup from 'country-code-lookup';

@Component({
  selector: 'app-surf-stats',
  templateUrl: './surf-stats.component.html',
  styleUrls: ['./surf-stats.component.css']
})
export class SurfStatsComponent implements OnInit {

  surfLeaderboard$: Observable<SurfLeaderboard>;

  constructor(private api: APIService) {}

  ngOnInit(): void {
    this.surfLeaderboard$ = this.api.getSurfLeaderboard();
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

}
