import { Component, Input, OnInit } from '@angular/core';
import { faCopy, faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { Gameserver } from 'src/app/shared/models/Gameserver';
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
  server: Gameserver;

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
