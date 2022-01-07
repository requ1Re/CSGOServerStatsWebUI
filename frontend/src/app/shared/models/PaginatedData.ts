export interface PaginatedData<T extends any[]> {
    _data: T;
    currentData: T;
    currentPage: number;
    pages: number;
    totalSize: number;
}