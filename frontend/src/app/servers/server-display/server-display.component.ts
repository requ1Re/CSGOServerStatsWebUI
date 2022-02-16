import { Component, Input, OnInit } from '@angular/core';
import { faCopy, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
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

  getServerImage(server: ServerAPI.GameServer): string {
    if(server.queryInfo.map.workshop){
      return server.queryInfo.map.preview!;
    }else{
      return 'assets/img/maps/preview/' + server.queryInfo.map.name + '.jpg';
    }
  }
}
