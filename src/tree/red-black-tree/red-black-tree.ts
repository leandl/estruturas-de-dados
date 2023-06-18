import { Compare } from "../../utils/functions";
import { BinarySearchTree } from "../binary-search-tree/binary-search-tree";
import { Colors, RedBlackNode } from "./red-black-node";


export class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T> | null = null;

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationLL(node: RedBlackNode<T>) {
    const tmp = node.getLeft()!;
    node.setLeft(tmp.getRight());

    const tmpRight = tmp.getRight();
    if (tmpRight) {
      tmpRight.setParent(node);
    }

    const nodeParent = node.getParent();
    tmp.setParent(nodeParent);
    if (!nodeParent) {
      this.root = tmp;
    } else {
      if (node === nodeParent.getLeft()) {
        nodeParent.setLeft(tmp);
      } else {
        nodeParent.setRight(tmp);
      }
    }

    tmp.setRight(node);
    node.setParent(tmp);
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationRR(node: RedBlackNode<T>) {
    const tmp = node.getRight()!;
    node.setRight(tmp.getLeft());

    const tmpLeft = tmp.getLeft();
    if (tmpLeft) {
      tmpLeft.setParent(node);
    }

    const nodeParent = node.getParent();
    tmp.setParent(nodeParent);
    if (!nodeParent) {
      this.root = tmp;
    } else {
      if (node === nodeParent.getLeft()) {
        nodeParent.setLeft(tmp);
      } else {
        nodeParent.setRight(tmp);
      }
    }

    tmp.setLeft(node);
    node.setParent(tmp);
  }

  insert(key: T) {
    if (this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.setColor(Colors.BLACK);
    } else {
      const newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }

  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFuntion(key, node.getKey()) === Compare.LESS_THAN) {
      const nodeLeft = node.getLeft();
      if (!nodeLeft) {
        const newNode = new RedBlackNode(key);
        node.setLeft(newNode);
        newNode.setParent(node);

        return newNode; 
      } else {
        return this.insertNode(nodeLeft, key);
      }
    }

    const nodeRight = node.getRight();
    if (!nodeRight) {
      const newNode = new RedBlackNode(key);
      node.setRight(newNode);
      newNode.setParent(node);

      return newNode; 
    } else {
      return this.insertNode(nodeRight, key);
    }
  }

  private fixTreeProperties(node: RedBlackNode<T>) {
    while (node.getParent()?.getColor()  === Colors.RED && node?.getColor() !== Colors.BLACK) {
      let parent = node.getParent()!;
      const grandParent = parent.getParent()!;

      // case A
      if (grandParent.getLeft() === parent) {
        const uncle = grandParent.getRight();

        // case 1: uncle of node is also red - only recoloring
        if (uncle?.isRed()) {
          grandParent.setColor(Colors.RED);
          parent.setColor(Colors.BLACK);
          uncle.setColor(Colors.BLACK);
          node = grandParent;
        } else {
          // case 2: node is right child - left rotate
          if (node === parent.getRight()) {
            this.rotationRR(parent);
            node = parent;
            parent = node.getParent()!;
          }

          // case 3: node is left child - right rotate
          this.rotationLL(grandParent);
          // swap color
          parent.setColor(Colors.BLACK);
          grandParent.setColor(Colors.RED);
          node = parent;
        }

      } else { // case B: parent is right child of grand parent

        const uncle = grandParent.getLeft();

        // case 1: uncle is read - only recoloring
        if (uncle?.isRed()) {
          grandParent.setColor(Colors.RED);
          parent.setColor(Colors.BLACK);
          uncle.setColor(Colors.BLACK);
          node = grandParent;
        } else {
          // case 2: node is left child - left rotate
          if (node === parent.getLeft()) {
            this.rotationLL(parent);
            node = parent;
            parent = node.getParent()!;
          }

           // case 3: node is right child - left rotate
          this.rotationRR(grandParent);
          // swap color
          parent.setColor(Colors.BLACK);
          grandParent.setColor(Colors.RED);
          node = parent;
        }
      }
    }

    this.root?.setColor(Colors.BLACK);
  }
}