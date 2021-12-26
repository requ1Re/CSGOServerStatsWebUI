import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/servers',
  },
  {
    path: 'servers',
    loadChildren: () =>
      import('./servers/servers.module').then((m) => m.ServersModule),
  },
  {
    path: 'stats',
    component: StatsComponent,
    loadChildren: () =>
      import('./stats/stats.module').then((m) => m.StatsModule),
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then((m) => m.InfoModule),
  },
  {
    path: '**',
    redirectTo: '/servers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
