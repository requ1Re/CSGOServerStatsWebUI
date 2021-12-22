import { Component, OnInit } from '@angular/core';
import { Gameserver } from '../shared/models/Gameserver';
import { ConfigUtil } from '../shared/utils/ConfigUtil';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {

  servers: Gameserver[] = ConfigUtil.GLOBALS.SERVERS;

  constructor() {}

  ngOnInit(): void {}

}
