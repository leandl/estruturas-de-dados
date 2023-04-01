export class Deque<T> {
  private count = 0;
  private lowestCount = 0;
  private items: Record<number, T> = {}

  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element);
      return;
    }

    if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
      return
    }

    for (let i = this.count; i > 0; i--) {
      this.items[i] = this.items[i - 1];
    }

    this.count++;
    this.lowestCount = 0;
    this.items[0] = element;
  }

  addBack(element: T) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const lastIndex = this.count - 1;
    const item = this.items[lastIndex];

    delete this.items[lastIndex]
    this.count--;  

    return item
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[this.lowestCount];
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const lastIndex = this.count - 1;
    return this.items[lastIndex];
  }

  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {}
  }

  isEmpty(): Boolean {
    return this.size() === 0;
  }

  size(): number {
    return this.count - this.lowestCount;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }

    return objString;
  }
}