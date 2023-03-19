export class StackObject<T> {
  private count: number = 0;
  private items: Record<number, T> = {};

  constructor() {}

  push(...items: T[]) {
    for (const item of items) {
      this.items[this.count] = item;
      this.count++;      
    }
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    
    const lastIndex = this.count - 1;
    const item = this.items[lastIndex];

    delete this.items[lastIndex]
    this.count--;  

    return item
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    
    const lastIndexInArray = this.count - 1;
    return this.items[lastIndexInArray];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  size(): number {
    return this.count;
  }

  toString(): string {
    return Object.entries(this.items).map(([_key, item]) => item).toString();
  }
}