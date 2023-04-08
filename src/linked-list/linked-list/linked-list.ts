import { defaultEquals } from "../../utils/functions";
import { Node } from "./node";

type EqualsFun<T> = (a: T, b: T) => boolean;

export class LinkedList<T> {
  private count: number = 0;
  private head?: Node<T>;

  constructor(private equalsFun: EqualsFun<T> = defaultEquals<T>) {}

  push(element: T) {
    const newNode = new Node<T>(element);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while(currentNode.next) {
        currentNode = currentNode.next;
      }
      
      currentNode.next = newNode;
    }

    this.count++;
  }

  private getElementAt(index: number): Node<T> | undefined {
    if (index < 0 || index >= this.count) {
      return;
    }

    let node: Node<T> | undefined = this.head!;
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
    } else {
      const previousNode = this.getElementAt(index -1);
      currentNode = previousNode!.next!;
      previousNode!.next = currentNode.next;
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

    const newNode = new Node<T>(element);
    if (index === 0) {
      const head = this.head;
      newNode.next = head;
      this.head = newNode;
    } else {
      const previousNode = this.getElementAt(index - 1)!;
      const currentNode = previousNode.next;

      newNode.next = currentNode;
      previousNode.next = newNode;
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