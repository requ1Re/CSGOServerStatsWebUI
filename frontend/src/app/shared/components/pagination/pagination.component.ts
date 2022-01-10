import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {

  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;

  page = 1;

  @Input()
  pages: number;

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  setPage(page: number) {
    if (page < 1 || page > this.pages) {
      return;
    }

    this.page = page;
    this.pageChanged.emit(this.page);
  }

  isActive(page: number) {
    return this.page === page;
  }

  pagination(current: number, lastNumber: number) {
    var current = current,
      last = lastNumber,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    console.log(rangeWithDots);
    return rangeWithDots;
  }

  isNumber(val: any): boolean { return typeof val === 'number'; }
  parseNumber(val: any) { return parseInt(val); }
}
