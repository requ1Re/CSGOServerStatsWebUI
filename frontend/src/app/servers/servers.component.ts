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
  loading: boolean = false;

  constructor(private api: APIService, private loadingService: LoadingService) {
    super();
  }

  ngOnInit(): void {
    this.register(
      this.loadingService.loading.subscribe((l) => this.loading = l)
    );

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
