import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SafeUrlPipe],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [NavbarComponent, FooterComponent, FontAwesomeModule, SafeUrlPipe],
})
export class SharedModule {}