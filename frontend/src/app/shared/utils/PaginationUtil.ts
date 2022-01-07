import { PaginatedData } from '../models/PaginatedData';

export class PaginationUtil<T extends any[]> {
  data: PaginatedData<T>;

  constructor(data: T, private itemsPerPage = 10) {
    this.setData(data);
  }

  setData(data: T) {
    this.data = {
      _data: data,
      pages: Math.ceil(data.length / this.itemsPerPage),
      totalSize: data.length,
      currentPage: 1,
      currentData: data.slice(0, this.itemsPerPage) as T,
    };
  }

  setPage(page: number) {
    if (page < 1 || page > this.data.pages) {
      return;
    }

    this.data.currentPage = page;
    this.data.currentData = this.data._data.slice(
      (page - 1) * this.itemsPerPage,
      (page - 1) * this.itemsPerPage + this.itemsPerPage
    ) as T;
  }

  getCurrentData() {
    return this.data.currentData;
  }

  getCurrentPage() {
    return this.data.currentPage;
  }

  getPages() {
    return this.data.pages;
  }
}
