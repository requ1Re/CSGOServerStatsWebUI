import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/servers',
  },
  {
    path: 'servers',
    loadChildren: () => import('./servers/servers.module').then((m) => m.ServersModule),
  },
  { path: 'stats', loadChildren: () => import('./stats/stats.module').then(m => m.StatsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
