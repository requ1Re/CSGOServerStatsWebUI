import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppError } from '../models/AppError';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  errors = new BehaviorSubject<AppError[]>([]);

  constructor() {}

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
