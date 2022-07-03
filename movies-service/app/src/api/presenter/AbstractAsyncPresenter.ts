export abstract class AbstractAsyncPresenter<TI, TO> {
  abstract present(item: TI): Promise<TO>;

  async presentList(items: TI[]): Promise<TO[]> {
    return Promise.all(items.map(async (item) => await this.present(item)));
  }
}
