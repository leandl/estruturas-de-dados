import { Compare } from "../../utils/functions";
import { BinarySearchTree } from "../binary-search-tree/binary-search-tree";
import { Node } from "../node";

enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}

const balanceFactor = {
  [-2]: BalanceFactor.UNBALANCED_RIGHT,
  [-1]: BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT,
  [1]: BalanceFactor.SLIGHTLY_UNBALANCED_LEFT,
  [2]: BalanceFactor.UNBALANCED_LEFT,
  "DEFAULT": BalanceFactor.BALANCED 
}

export class AVLTree<T> extends BinarySearchTree<T> {
  getNodeHeight(node: Node<T> | null): number {
    if (node === null) {
      return -1;
    }

    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    return Math.max(
      this.getNodeHeight(nodeLeft),
      this.getNodeHeight(nodeRight)
    ) + 1;
  }

  getBalanceFactor(node: Node<T>): BalanceFactor {
    const nodeLeft = node.getLeft();
    const nodeRight = node.getRight();

    const heightDifference = this.getNodeHeight(nodeLeft) - this.getNodeHeight(nodeRight);
    return balanceFactor[heightDifference] ?? balanceFactor["DEFAULT"];
  }

  private rotationLL(node: Node<T>): Node<T> {
    const tmp = node.getLeft()!;
    node.setLeft(tmp.getRight());
    tmp.setRight(node);

    return tmp;
  }
  
  private rotationRR(node: Node<T>): Node<T> {
    const tmp = node.getRight()!;
    node.setRight(tmp.getLeft());
    tmp.setLeft(node);

    return tmp;
  }
  
  private rotationLR(node: Node<T>): Node<T> {
    const nodeLeft = node.getLeft()!;
    const rotationRR = this.rotationRR(nodeLeft);

    node.setLeft(rotationRR);
    return this.rotationLL(node);
  }

  private rotationRL(node: Node<T>): Node<T> {
    const nodeRight = node.getRight()!;
    const rotationLL = this.rotationLL(nodeRight);

    node.setRight(rotationLL);
    return this.rotationRR(node);
  }

  insert(key: T): void {
    this.root = this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T> | null, key: T): Node<T> {
    if (node === null) {
      return new Node(key);
    }

    const resultCompare = this.compareFuntion(key, node.getKey());
    
    if (resultCompare === Compare.LESS_THAN) {
      const nodeLeft = node.getLeft();
      const newNode = this.insertNode(nodeLeft, key);
      node.setLeft(newNode);
    } else if (resultCompare === Compare.BIGGER_THAN) {
      const nodeRight = node.getRight();
      const newNode = this.insertNode(nodeRight, key);
      node.setRight(newNode);
    } else {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const nodeLeft = node.getLeft()!;

      if (this.compareFuntion(key, nodeLeft.getKey()) === Compare.LESS_THAN) {
        return this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const nodeRight = node.getRight()!;
      
      if (this.compareFuntion(key, nodeRight.getKey()) === Compare.BIGGER_THAN) {
        return this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }

    return node;
  }

  remove(key: T): void {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T> | null, key: T): Node<T> | null {
    node = super.removeNode(node, key);

    if (node === null) {
      return node;
    }

    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const nodeLeft = node.getLeft()!;

      if (this.compareFuntion(key, nodeLeft.getKey()) === Compare.LESS_THAN) {
        return this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const nodeRight = node.getRight()!;
      
      if (this.compareFuntion(key, nodeRight.getKey()) === Compare.BIGGER_THAN) {
        return this.rotationRR(node);
      } else {
        return this.rotationRL(node);
      }
    }


    return node;
  }

}