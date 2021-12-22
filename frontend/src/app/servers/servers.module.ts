import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServersComponent } from './servers.component';
import { SharedModule } from '../shared/shared.module';
import { ServersRoutingModule } from './servers-routing.module';


@NgModule({
  declarations: [
    ServersComponent
  ],
  imports: [
    CommonModule,
    ServersRoutingModule,
    SharedModule
  ]
})
export class ServersModule { }
