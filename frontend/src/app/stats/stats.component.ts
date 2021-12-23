import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faAward, faMedal, faTrophy } from '@fortawesome/free-solid-svg-icons';
import * as lookup from 'country-code-lookup';
import { Observable } from 'rxjs';
import { SurfLeaderboard } from '../shared/models/SurfLeaderboard';
import { APIService } from '../shared/services/APIService';
import { ConfigUtil } from '../shared/utils/ConfigUtil';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
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
