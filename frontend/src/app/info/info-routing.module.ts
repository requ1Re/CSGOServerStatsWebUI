import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info.component';
import { LicenseInfoComponent } from './license-info/license-info.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'license' },
  { path: 'license', component: LicenseInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoRoutingModule {}
