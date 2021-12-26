import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KzStatsComponent } from './kz-stats/kz-stats.component';
import { RetakesStatsComponent } from './retakes-stats/retakes-stats.component';
import { SurfStatsComponent } from './surf-stats/surf-stats.component';

const routes: Routes = [
  { path: '', redirectTo: 'surf' },
  { path: 'surf', component: SurfStatsComponent },
  { path: 'kz', component: KzStatsComponent },
  { path: 'retakes', component: RetakesStatsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
