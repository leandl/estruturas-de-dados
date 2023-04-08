import { defaultEquals } from "../../utils/functions";
import { DoublyNode } from "./doubly-node";

type EqualsFun<T> = (a: T, b: T) => boolean;

export class DoublyLinkedList<T> {
  private count: number = 0;
  private head?: DoublyNode<T>;
  private tail?: DoublyNode<T>;

  constructor(private equalsFun: EqualsFun<T> = defaultEquals<T>) {}

  push(element: T) {
    const newNode = new DoublyNode<T>(element);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let currentNode = this.tail!;
      currentNode.next = newNode;
      newNode.prev = currentNode;
      this.tail = newNode;
    }

    this.count++;
  }

  private getElementAt(index: number): DoublyNode<T> | undefined {
    if (index < 0 || index >= this.count) {
      return;
    }

    if (index === 0) {
      return this.head!;
    }

    if (index === this.count - 1) {
      return this.tail!
    }

    let node: DoublyNode<T> | undefined = this.head!;
    for (let i = 0; i < index && Boolean(node); i++) {
      node = node!.next;
    }

    return node;
  }

  getAt(index: number): T | undefined {
    const node = this.getElementAt(index);
    return node?.element;
  }

  indexOf(element: T): number {
    let currentNode = this.head;
    for (let i = 0; i < this.count && Boolean(currentNode); i++) {
      if (this.equalsFun(element, currentNode!.element)) {
        return i;
      }

      currentNode = currentNode?.next
    }

    return -1;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index >= this.count) {
      return;
    }

    let currentNode = this.head!;
    if (index === 0) {
      this.head = currentNode.next;

      if (this.count === 1) {
        this.tail = undefined;
      } else {
        this.head!.prev = undefined;
      }
    } else if (index === this.count -1) { 
      currentNode = this.tail!
      const previousNode = currentNode.prev!;
      previousNode.next = undefined;
      this.tail = previousNode;
    } else {
      currentNode = this.getElementAt(index)!;
      const previousNode = currentNode.prev!;
      
      previousNode.next = currentNode.next!
      currentNode.prev!.next = previousNode;
    }

    this.count--;
    return currentNode.element;
  }

  remove(element: T) {
    const indexElement = this.indexOf(element);
    return this.removeAt(indexElement);
  }

  insert(element: T, index: number): boolean {
    if (index < 0 || index > this.count) {
      return false
    }

    const newNode = new DoublyNode<T>(element);
    if (index === 0) {
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        const currentHead = this.head;
        newNode.next = currentHead;
        currentHead.prev = newNode
        this.head = newNode;
      }
    } else if (index === this.count) { 
      const currentTail = this.tail!;
      newNode.prev = currentTail;
      currentTail.next = newNode
      this.tail = newNode;
    } else {
      const previousNode = this.getElementAt(index - 1)!;
      const currentNode = previousNode.next!;

      newNode.next = currentNode;
      previousNode.next = newNode;
      currentNode.prev = newNode;
      newNode.prev = previousNode;
    }

    this.count++;
    return true;
  }

  getHead() {
    return this.head?.element;
  }

  size() {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    const head = this.head!;

    let objString = `${head.element}`;
    let currentNode = head.next;
    while (currentNode) {
      objString += `,${currentNode.element}`
      currentNode = currentNode.next;
    }

    return objString;
  }
}