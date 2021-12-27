import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppError } from '../models/AppError';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errors = new BehaviorSubject<AppError[]>([]);

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.clearErrors();
      }
    });
  }

  setErrors(errors: AppError[]) {
    this.errors.next(errors);
  }

  addError(error: AppError) {
    this.errors.next([...this.errors.getValue(), error]);
  }

  clearErrors() {
    this.errors.next([]);
  }
}
