import { AVLTree } from "./avl-tree";

describe('testing the AVLTree structure', () => {
  test('create the AVLTree structure', () => {
    const avlTree = new AVLTree<any>();
    expect(avlTree.size()).toBe(0);
  });

  test('add items in the AVLTree structure', () => {
    const avlTree = new AVLTree<number>();

    avlTree.insert(2);
    expect(avlTree.size()).toBe(1);

    avlTree.insert(6);
    avlTree.insert(9);
    avlTree.insert(4);
    expect(avlTree.size()).toBe(4);
  });


  test("visit all items in order the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    const arrayAVLTreeInOrder = [] as number[];
    const arrayAVLTreeInOrderTest = [2, 4, 6, 9];

    avlTree.insert(4);
    avlTree.insert(2);
    avlTree.insert(6);
    avlTree.insert(9);

    avlTree.inOrderTraverse((key) => {
      arrayAVLTreeInOrder.push(key)
    });

    expect(arrayAVLTreeInOrder.toString()).toBe(arrayAVLTreeInOrderTest.toString());
  });

  test("visit all items pre-order the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    const arrayAVLTreePreOrder = [] as number[];
    const arrayAVLTreePreOrderTest = [4, 2, 6, 5, 9];

    avlTree.insert(4);
    avlTree.insert(2);
    avlTree.insert(6);
    avlTree.insert(5);
    avlTree.insert(9);

    avlTree.preOrderTraverse((key) => {
      arrayAVLTreePreOrder.push(key)
    });

    expect(arrayAVLTreePreOrder.toString()).toBe(arrayAVLTreePreOrderTest.toString());
  });

  test("visit all items post-order the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    const arrayAVLTreePostOrder = [] as number[];
    const arrayAVLTreePostOrderTest = [2, 5, 9, 6, 4];

    avlTree.insert(4);
    avlTree.insert(2);
    avlTree.insert(6);
    avlTree.insert(5);
    avlTree.insert(9);

    avlTree.postOrderTraverse((key) => {
      arrayAVLTreePostOrder.push(key)
    });

    expect(arrayAVLTreePostOrder.toString()).toBe(arrayAVLTreePostOrderTest.toString());
  });
 
  test("min item in the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    expect(avlTree.min()).toBe(null);

    avlTree.insert(6);
    avlTree.insert(4);
    expect(avlTree.min()).toBe(4);

    avlTree.insert(5);
    avlTree.insert(2);
    avlTree.insert(9);
    expect(avlTree.min()).toBe(2);
  });

  test("max item in the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    expect(avlTree.max()).toBe(null);

    avlTree.insert(6);
    avlTree.insert(4);
    expect(avlTree.max()).toBe(6);

    avlTree.insert(5);
    avlTree.insert(2);
    avlTree.insert(9);
    expect(avlTree.max()).toBe(9);
  });

  test("search item in the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();

    expect(avlTree.search(2)).toBe(false);

    avlTree.insert(6);
    avlTree.insert(4);
    expect(avlTree.search(4)).toBe(true);
    expect(avlTree.search(6)).toBe(true);
    expect(avlTree.search(10)).toBe(false);

    avlTree.insert(5);
    avlTree.insert(2);
    avlTree.insert(9);
    expect(avlTree.search(5)).toBe(true);
    expect(avlTree.search(2)).toBe(true);
    expect(avlTree.search(9)).toBe(true);
    expect(avlTree.search(90)).toBe(false);
  });

  test("remove item in the AVLTree structure", () => {
    const avlTree = new AVLTree<number>();
    expect(avlTree.size()).toBe(0);

    avlTree.insert(6);
    avlTree.insert(2);
    avlTree.insert(9);
    avlTree.insert(4);
    avlTree.insert(1);
    avlTree.insert(7);

    expect(avlTree.size()).toBe(6);

    avlTree.remove(9)

    const test1 = [] as number[];
    avlTree.inOrderTraverse((key) => test1.push(key));

    expect(test1.toString()).toBe([1, 2, 4, 6, 7].toString());
    expect(avlTree.size()).toBe(5);


    avlTree.remove(1);
    avlTree.remove(6);

    const test2 = [] as number[];
    avlTree.inOrderTraverse((key) => test2.push(key));

    expect(test2.toString()).toBe([2, 4, 7].toString());
    expect(avlTree.size()).toBe(3);
  });
 
});