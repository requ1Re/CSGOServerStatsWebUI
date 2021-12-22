import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServersRoutingModule } from './servers-routing.module';
import { ServersComponent } from './servers.component';
import { ServerListComponent } from './server-list/server-list.component';


@NgModule({
  declarations: [
    ServersComponent,
    ServerListComponent
  ],
  imports: [
    CommonModule,
    ServersRoutingModule
  ]
})
export class ServersModule { }
