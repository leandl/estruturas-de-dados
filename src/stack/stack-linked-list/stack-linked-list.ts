import { DoublyLinkedList } from "../../linked-list/doubly-linked-list/doubly-linked-list";

export class StackLinkedList<T> {
  private items = new DoublyLinkedList<T>();

  constructor() {}

  push(...items: T[]) {
    for (const item of items) {
      this.items.push(item);    
    }
  }

  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    
    const lastIndex= this.size() - 1;
    return this.items.removeAt(lastIndex);
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    
    const lastIndex= this.size() - 1;
    return this.items.getAt(lastIndex);
  }

  isEmpty(): boolean {
    return this.items.isEmpty();
  }

  clear() {
    this.items = new DoublyLinkedList();
  }

  size(): number {
    return this.items.size();
  }

  toString(): string {
    return this.items.toString();
  }
}