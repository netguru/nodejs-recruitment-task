export class PaginatedList<T> {
  constructor(private data: T, private count: number, private total: number) {}

  getData(): T {
    return this.data;
  }

  getTotal(): number {
    return this.total;
  }

  getCount(): number {
    return this.count;
  }
}
