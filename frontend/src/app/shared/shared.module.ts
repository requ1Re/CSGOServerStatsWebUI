import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { HttpClientModule } from '@angular/common/http';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SafeUrlPipe, BaseComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule, HttpClientModule],
  exports: [NavbarComponent, FooterComponent, FontAwesomeModule, SafeUrlPipe, BaseComponent],
})
export class SharedModule {}
