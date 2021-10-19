// TODO: persist on disk

export abstract class BaseRepository<T extends { id: string }> {
  private items: T[] = []

  updateOrCreate(id: string, item: T): void {
    // eslint-disable-next-line unicorn/prefer-array-some
    this.find(item.id) ? this.update(id, item) : this.create(item)
  }

  create(item: T): void {
    this.items.push(item)
  }

  update(id: string, item: T): void {
    this.items[this.findIndex(id)] = item
  }

  delete(id: string): void {
    this.items.splice(this.findIndex(id), 1)
  }

  private findIndex(id: string) {
    return this.items.findIndex((item) => item.id === id)
  }

  find(id: string): T | undefined {
    return this.items.find((item) => item.id === id)
  }

  findAll(): T[] {
    return this.items
  }

  flushAll(): void {
    this.items = []
  }
}
