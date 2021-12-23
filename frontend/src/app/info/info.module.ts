import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { SharedModule } from '../shared/shared.module';
import { LicenseInfoComponent } from './license-info/license-info.component';


@NgModule({
  declarations: [
    InfoComponent,
    LicenseInfoComponent
  ],
  imports: [
    CommonModule,
    InfoRoutingModule,
    SharedModule
  ]
})
export class InfoModule { }
