import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
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
}
