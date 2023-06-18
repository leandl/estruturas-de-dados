import { Compare, CompareFunction, defaultCompare } from "../../utils/functions";
import { Node } from "../node";


type VisitCallback<T> = (key: T) => void;

export class BinarySearchTree<T> {
  protected root: Node<T> | null = null;

  constructor(protected compareFuntion: CompareFunction<T> = defaultCompare) {}

  insert(key: T): void {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }

    return this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T>, key: T): void {
    if (this.compareFuntion(key, node.getKey()) === Compare.LESS_THAN) {
      const nodeLeft = node.getLeft();
      if (nodeLeft === null) {
        node.setLeft(new Node(key));
      } else {
        this.insertNode(nodeLeft, key);
      }
    } else {
      const nodeRight = node.getRight();
      if (nodeRight === null) {
        node.setRight(new Node(key));
      } else {
        this.insertNode(nodeRight, key);
      }
    }
  }

  inOrderTraverse(callback: VisitCallback<T>): void {
    this.inOrderTraverseNode(this.root, callback);
  }

  private inOrderTraverseNode(node: Node<T> | null, callback: VisitCallback<T>): void {
    if (node === null) {
      return;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    this.inOrderTraverseNode(nodeLeft, callback);
    callback(node.getKey());
    this.inOrderTraverseNode(nodeRight, callback);
  }

  preOrderTraverse(callback: VisitCallback<T>): void {
    this.preOrderTraverseNode(this.root, callback);
  }

  private preOrderTraverseNode(node: Node<T> | null, callback: VisitCallback<T>): void {
    if (node === null) {
      return;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    callback(node.getKey());
    this.preOrderTraverseNode(nodeLeft, callback);
    this.preOrderTraverseNode(nodeRight, callback);
  }

  postOrderTraverse(callback: VisitCallback<T>): void {
    this.postOrderTraverseNode(this.root, callback);
  }

  private postOrderTraverseNode(node: Node<T> | null, callback: VisitCallback<T>): void {
    if (node === null) {
      return;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    this.postOrderTraverseNode(nodeLeft, callback);
    this.postOrderTraverseNode(nodeRight, callback);
    callback(node.getKey());
  }

  min(): T | null {
    const minNode = this.minNode(this.root);
    return minNode === null ? null : minNode.getKey();
  }

  private minNode(node: Node<T> | null): Node<T> | null {
    let current = node;
    while (current?.getLeft()) {
      current = current.getLeft();
    }

    return current;
  }

  max(): T | null {
    const maxNode = this.maxNode(this.root);
    return maxNode === null ? null : maxNode.getKey();
  }

  private maxNode(node: Node<T> | null): Node<T> | null {
    let current = node;
    while (current?.getRight()) {
      current = current.getRight();
    }

    return current;
  }

  search(key: T): boolean {
    return this.searchNode(this.root, key);
  }

  private searchNode(node: Node<T> | null, key: T): boolean {
    if (node === null) {
      return false;
    }

    const resultCompare = this.compareFuntion(key, node.getKey());
    
    if (resultCompare === Compare.LESS_THAN) {
      const nodeLeft = node.getLeft();
      return this.searchNode(nodeLeft, key);
    }

    if (resultCompare === Compare.BIGGER_THAN) {
      const nodeRight = node.getRight();
      return this.searchNode(nodeRight, key);
    }

    return true;
  }

  remove(key: T): void {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    const resultCompare = this.compareFuntion(key, node.getKey());
    
    if (resultCompare === Compare.LESS_THAN) {
      const nodeLeft = node.getLeft();
      const resultRemoveNode = this.removeNode(nodeLeft, key);

      node.setLeft(resultRemoveNode);
      return node;
    }

    if (resultCompare === Compare.BIGGER_THAN) {
      const nodeRight = node.getRight();
      const resultRemoveNode = this.removeNode(nodeRight, key);

      node.setRight(resultRemoveNode);
      return node;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    if (nodeLeft === null && nodeRight === null) {
      return null;
    }

    if (nodeLeft === null || nodeRight === null) {
      return (nodeLeft !== null) ? nodeLeft : nodeRight;
    }
    
    const aux = this.minNode(nodeRight)!;
    const auxKey = aux.getKey(); 
    const resultRemoveNode = this.removeNode(nodeRight, auxKey);

    const newNode = new Node(auxKey);
    newNode.setLeft(nodeLeft);
    newNode.setRight(resultRemoveNode);
    return newNode;
  }


  size(): number {
    return this.sizeNode(this.root);
  }

  private sizeNode(node: Node<T> | null): number {
    if (node === null) {
      return 0;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    return this.sizeNode(nodeLeft) + this.sizeNode(nodeRight) + 1;
  }
}