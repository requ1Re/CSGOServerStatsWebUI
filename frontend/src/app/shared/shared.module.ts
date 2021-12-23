import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SafeUrlPipe, TableComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [NavbarComponent, FooterComponent, FontAwesomeModule, SafeUrlPipe, TableComponent],
})
export class SharedModule {}
