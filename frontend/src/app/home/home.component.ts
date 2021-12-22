import { Component, OnInit } from '@angular/core';
import { faCopy, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Gameserver } from '../shared/models/Gameserver';
import { ConfigUtil } from '../shared/utils/ConfigUtil';
import { GamemodeUtil } from '../shared/utils/GamemodeUtil';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faCopy = faCopy;
  faPlayCircle = faPlayCircle;

  servers: Gameserver[] = ConfigUtil.GLOBALS.SERVERS;

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

  getServerImage(server: Gameserver): string {
    return GamemodeUtil.getGamemodeImagePath(server.gamemode);
  }
}
