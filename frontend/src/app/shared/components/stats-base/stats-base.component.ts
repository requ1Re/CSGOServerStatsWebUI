import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import * as lookup from 'country-code-lookup';
import { ConfigUtil } from '../../utils/ConfigUtil';
import { BaseComponent } from '../base/base.component';

@Component({template:''})
export class StatsBaseComponent extends BaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
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
