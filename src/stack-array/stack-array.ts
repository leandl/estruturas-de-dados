export class StackArray<T> {
  private items: T[] = [];

  constructor() {}

  push(...items: T[]) {
    this.items.push(...items);
  }

  pop(): T | undefined {
    return this.items.pop(); 
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    
    const lastIndexInArray = this.items.length - 1;
    return this.items[lastIndexInArray];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  toString(): string {
    return this.items.toString();
  }
}