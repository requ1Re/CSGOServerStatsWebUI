import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './shared/components/base/base.component';
import { AppError } from './shared/models/AppError';
import { ErrorService } from './shared/services/ErrorService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = '1337Frankfurt CS:GO Servers';

  errors: AppError[] = [];

  constructor(private errorService: ErrorService) {
    super();
  }

  ngOnInit(): void {
    document.title = this.title;

    this.register(
      this.errorService.errors.subscribe((errors) => {
        this.errors = errors;
      })
    );
  }
}
