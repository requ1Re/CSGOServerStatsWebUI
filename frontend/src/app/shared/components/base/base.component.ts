import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({template:''})
export class BaseComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  register(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

}
