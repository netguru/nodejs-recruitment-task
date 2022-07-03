export interface PaginationData {
  page: number;
  perPage: number;
}

export class Pagination implements PaginationData {
  constructor(public page: number, public perPage: number) {}
}
