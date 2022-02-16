import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../shared/components/base/base.component';
import { ServerAPI } from '../shared/models/Server';
import { APIService } from '../shared/services/api.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent extends BaseComponent implements OnInit {

  servers: ServerAPI.GameServer[] = [];

  constructor(private api: APIService, private loadingService: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.register(
      this.api.getServers().subscribe((servers) => {
        if(servers.data){
          this.servers = servers.data;
        }
        this.loadingService.hideLoading();
      })
    );
  }

}
