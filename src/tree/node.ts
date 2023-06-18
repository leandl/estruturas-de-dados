export class Node<T> {
  protected left: Node<T> | null = null;
  protected right: Node<T> | null = null;

  constructor(private key: T) {}

  getKey(): T {
    return this.key;
  }

  setKey(key: T): void {
    this.key = key;
  } 

  getLeft(): Node<T> | null {
    return this.left;
  }

  setLeft(left: Node<T> | null): void {
    this.left = left;
  }


  getRight(): Node<T> | null {
    return this.right;
  }

  setRight(right: Node<T> | null): void {
    this.right = right;
  }
}