import { Component, Input, OnInit } from '@angular/core';
import { faCopy, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ServerAPI } from 'src/app/shared/models/Server';
import { GamemodeUtil } from 'src/app/shared/utils/GamemodeUtil';

@Component({
  selector: 'app-server-display',
  templateUrl: './server-display.component.html',
  styleUrls: ['./server-display.component.css'],
})
export class ServerDisplayComponent implements OnInit {
  faCopy = faCopy;
  faPlayCircle = faPlayCircle;
  faExclamationTriangle = faExclamationTriangle;

  @Input()
  server: ServerAPI.GameServer;

  constructor() {}

  ngOnInit(): void {}

  copyToClipboard(ip: string) {
    navigator.clipboard
      .writeText(ip)
      .then(() => {
        console.log('Copied IP!');
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }

  isOnline(server: ServerAPI.GameServer){
    console.log(server.status === ServerAPI.Status.ONLINE);
    return server.status === ServerAPI.Status.ONLINE;
  }

  getBackgroundImage(server: ServerAPI.GameServer): string {
    let img = "";
    if(server.status === ServerAPI.Status.ONLINE){
      const queryInfo = server.queryInfo!;
      if(queryInfo.map.workshop){
        img = queryInfo.map.preview!;
      }else{
        img = 'assets/img/maps/preview/' + queryInfo.map.name + '.jpg';
      }
      return "url('" + img + "')";
    }else{
      return "none";
    }
  }
}
