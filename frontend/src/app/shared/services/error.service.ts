import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppError } from '../models/AppError';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errors = new BehaviorSubject<AppError[]>([]);

  constructor(router: Router, private loadingService: LoadingService) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clearErrors();
      }
    });
  }

  setErrors(errors: AppError[]) {
    this.loadingService.hideLoading();
    this.errors.next(errors);
  }

  addError(error: AppError) {
    this.loadingService.hideLoading();
    this.errors.next([...this.errors.getValue(), error]);
  }

  clearErrors() {
    this.loadingService.hideLoading();
    this.errors.next([]);
  }
}
