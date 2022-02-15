import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './shared/components/base/base.component';
import { AppError } from './shared/models/AppError';
import { ErrorService } from './shared/services/error.service';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = '1337Frankfurt CS:GO Servers';

  errors: AppError[] = [];
  showLoading = true;

  constructor(private errorService: ErrorService, private loadingService: LoadingService) {
    super();

    this.register(
      this.errorService.errors.subscribe((errors) => (this.errors = errors))
    );

    this.register(
      this.loadingService.loading.subscribe((loading) => {
        setTimeout(() => {
          this.showLoading = loading;
        });
      })
    );
  }

  ngOnInit(): void {
    document.title = this.title;
  }
}
