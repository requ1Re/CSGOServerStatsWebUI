import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsComponent } from './stats.component';
import { SharedModule } from '../shared/shared.module';
import { SurfStatsComponent } from './surf-stats/surf-stats.component';
import { KzStatsComponent } from './kz-stats/kz-stats.component';
import { RetakesStatsComponent } from './retakes-stats/retakes-stats.component';


@NgModule({
  declarations: [
    StatsComponent,
    SurfStatsComponent,
    KzStatsComponent,
    RetakesStatsComponent
  ],
  imports: [
    CommonModule,
    StatsRoutingModule,
    SharedModule
  ],
  bootstrap: [StatsComponent]
})
export class StatsModule { }
