import { Node } from "../node";

export enum Colors {
  RED = 0,
  BLACK = 1
}

export class RedBlackNode<T> extends Node<T> {
  private parent: RedBlackNode<T> | null = null;
  private color: Colors = Colors.RED;

  protected left: RedBlackNode<T> | null = null;
  protected right: RedBlackNode<T> | null = null;

  getParent(): RedBlackNode<T> | null {
    return this.parent;
  }

  setParent(parent: RedBlackNode<T> | null): void {
    this.parent = parent;
  }

  getColor(): Colors {
    return this.color;
  }
  
  setColor(color: Colors): void {
    this.color = color;
  }  

  isRed() {
    return this.color === Colors.RED;
  }

  getLeft(): RedBlackNode<T> | null {
    return this.left;
  }

  getRight(): RedBlackNode<T> | null {
    return this.right;
  }
}