import { RedBlackTree } from "./red-black-tree";

describe('testing the RedBlackTree structure', () => {
  test('create the RedBlackTree structure', () => {
    const redBlackTree = new RedBlackTree<any>();
    expect(redBlackTree.size()).toBe(0);
  });

  test('add items in the RedBlackTree structure', () => {
    const redBlackTree = new RedBlackTree<number>();

    redBlackTree.insert(2);
    expect(redBlackTree.size()).toBe(1);

    redBlackTree.insert(6);
    redBlackTree.insert(9);
    redBlackTree.insert(4);
    expect(redBlackTree.size()).toBe(4);
  });


  test("visit all items in order the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    const arrayRedBlackTreeInOrder = [] as number[];
    const arrayRedBlackTreeInOrderTest = [2, 4, 6, 9];

    redBlackTree.insert(4);
    redBlackTree.insert(2);
    redBlackTree.insert(6);
    redBlackTree.insert(9);

    redBlackTree.inOrderTraverse((key) => {
      arrayRedBlackTreeInOrder.push(key)
    });

    expect(arrayRedBlackTreeInOrder.toString()).toBe(arrayRedBlackTreeInOrderTest.toString());
  });

  test("visit all items pre-order the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    const arrayRedBlackTreePreOrder = [] as number[];
    const arrayRedBlackTreePreOrderTest = [4, 2, 6, 5, 9];

    redBlackTree.insert(4);
    redBlackTree.insert(2);
    redBlackTree.insert(6);
    redBlackTree.insert(5);
    redBlackTree.insert(9);

    redBlackTree.preOrderTraverse((key) => {
      arrayRedBlackTreePreOrder.push(key)
    });

    expect(arrayRedBlackTreePreOrder.toString()).toBe(arrayRedBlackTreePreOrderTest.toString());
  });

  test("visit all items post-order the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    const arrayRedBlackTreePostOrder = [] as number[];
    const arrayRedBlackTreePostOrderTest = [2, 5, 9, 6, 4];

    redBlackTree.insert(4);
    redBlackTree.insert(2);
    redBlackTree.insert(6);
    redBlackTree.insert(5);
    redBlackTree.insert(9);

    redBlackTree.postOrderTraverse((key) => {
      arrayRedBlackTreePostOrder.push(key)
    });

    expect(arrayRedBlackTreePostOrder.toString()).toBe(arrayRedBlackTreePostOrderTest.toString());
  });
 
  test("min item in the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    expect(redBlackTree.min()).toBe(null);

    redBlackTree.insert(6);
    redBlackTree.insert(4);
    expect(redBlackTree.min()).toBe(4);

    redBlackTree.insert(5);
    redBlackTree.insert(2);
    redBlackTree.insert(9);
    expect(redBlackTree.min()).toBe(2);
  });

  test("max item in the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    expect(redBlackTree.max()).toBe(null);

    redBlackTree.insert(6);
    redBlackTree.insert(4);
    expect(redBlackTree.max()).toBe(6);

    redBlackTree.insert(5);
    redBlackTree.insert(2);
    redBlackTree.insert(9);
    expect(redBlackTree.max()).toBe(9);
  });

  test("search item in the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();

    expect(redBlackTree.search(2)).toBe(false);

    redBlackTree.insert(6);
    redBlackTree.insert(4);
    expect(redBlackTree.search(4)).toBe(true);
    expect(redBlackTree.search(6)).toBe(true);
    expect(redBlackTree.search(10)).toBe(false);

    redBlackTree.insert(5);
    redBlackTree.insert(2);
    redBlackTree.insert(9);
    expect(redBlackTree.search(5)).toBe(true);
    expect(redBlackTree.search(2)).toBe(true);
    expect(redBlackTree.search(9)).toBe(true);
    expect(redBlackTree.search(90)).toBe(false);
  });

  test("remove item in the RedBlackTree structure", () => {
    const redBlackTree = new RedBlackTree<number>();
    expect(redBlackTree.size()).toBe(0);

    redBlackTree.insert(6);
    redBlackTree.insert(2);
    redBlackTree.insert(9);
    redBlackTree.insert(4);
    redBlackTree.insert(1);
    redBlackTree.insert(7);

    expect(redBlackTree.size()).toBe(6);

    redBlackTree.remove(9)

    const test1 = [] as number[];
    redBlackTree.inOrderTraverse((key) => test1.push(key));

    expect(test1.toString()).toBe([1, 2, 4, 6, 7].toString());
    expect(redBlackTree.size()).toBe(5);


    redBlackTree.remove(1);
    redBlackTree.remove(6);

    const test2 = [] as number[];
    redBlackTree.inOrderTraverse((key) => test2.push(key));

    expect(test2.toString()).toBe([2, 4, 7].toString());
    expect(redBlackTree.size()).toBe(3);
  });
 
});