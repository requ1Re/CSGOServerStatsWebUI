import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faTrophy, faMedal, faAward } from '@fortawesome/free-solid-svg-icons';
import * as lookup from 'country-code-lookup';
import { LoadingService } from '../../services/loading.service';
import { UserDataService } from '../../services/userdata.service';
import { ConfigUtil } from '../../utils/ConfigUtil';
import { SteamIDUtil } from '../../utils/SteamIDUtil';
import { BaseComponent } from '../base/base.component';

@Component({template:''})
export class StatsBaseComponent extends BaseComponent implements OnInit {

  constructor(public userDataService: UserDataService, private loadingService: LoadingService) { super(); }

  ngOnInit(): void {
  }

  getCountryFlagByName(countryName: string | undefined): string {
    const unknownCountryCode = 'xx';

    const _countryName = countryName?.replace('The', '').trim();
    return ConfigUtil.getFlagImagePath(
      _countryName
        ? lookup.byCountry(_countryName)?.iso2 ?? unknownCountryCode
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
        return 'inherit';
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

  isEmpty(str: string){
    return !str || !str.trim();
  }


  convertSteamIdToCommunityId(steamId: string): string {
    return SteamIDUtil.convertSteamIdToCommunityId(steamId);
  }

  public requestUserData(steamIds: string[]) {
    this.userDataService.requestUserData(steamIds);
  }

  public getUserNameFromCache(steamId: string, defaultValue: string = steamId) {
    return this.userDataService.getUserNameFromCache(steamId, defaultValue);
  }

  showLoadingSpinner(val: boolean){
    if(val){
      this.loadingService.showLoading();
    }else{
      this.loadingService.hideLoading();
    }
  }
}
