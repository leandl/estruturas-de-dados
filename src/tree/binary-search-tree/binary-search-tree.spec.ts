import { BinarySearchTree } from "./binary-search-tree";

describe('testing the BinarySearchTree structure', () => {
  test('create the BinarySearchTree structure', () => {
    const binarySearchTree = new BinarySearchTree<any>();
    expect(binarySearchTree.size()).toBe(0);
  });

  test('add items in the BinarySearchTree structure', () => {
    const binarySearchTree = new BinarySearchTree<number>();

    binarySearchTree.insert(2);
    expect(binarySearchTree.size()).toBe(1);

    binarySearchTree.insert(6);
    binarySearchTree.insert(9);
    binarySearchTree.insert(4);
    expect(binarySearchTree.size()).toBe(4);
  });


  test("visit all items in order the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    const arrayBinarySearchTreeInOrder = [] as number[];
    const arrayBinarySearchTreeInOrderTest = [2, 4, 6, 9];

    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(6);
    binarySearchTree.insert(9);

    binarySearchTree.inOrderTraverse((key) => {
      arrayBinarySearchTreeInOrder.push(key)
    });

    expect(arrayBinarySearchTreeInOrder.toString()).toBe(arrayBinarySearchTreeInOrderTest.toString());
  });

  test("visit all items pre-order the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    const arrayBinarySearchTreePreOrder = [] as number[];
    const arrayBinarySearchTreePreOrderTest = [4, 2, 6, 5, 9];

    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(6);
    binarySearchTree.insert(5);
    binarySearchTree.insert(9);

    binarySearchTree.preOrderTraverse((key) => {
      arrayBinarySearchTreePreOrder.push(key)
    });

    expect(arrayBinarySearchTreePreOrder.toString()).toBe(arrayBinarySearchTreePreOrderTest.toString());
  });

  test("visit all items post-order the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    const arrayBinarySearchTreePostOrder = [] as number[];
    const arrayBinarySearchTreePostOrderTest = [2, 5, 9, 6, 4];

    binarySearchTree.insert(4);
    binarySearchTree.insert(2);
    binarySearchTree.insert(6);
    binarySearchTree.insert(5);
    binarySearchTree.insert(9);

    binarySearchTree.postOrderTraverse((key) => {
      arrayBinarySearchTreePostOrder.push(key)
    });

    expect(arrayBinarySearchTreePostOrder.toString()).toBe(arrayBinarySearchTreePostOrderTest.toString());
  });
 
  test("min item in the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    expect(binarySearchTree.min()).toBe(null);

    binarySearchTree.insert(6);
    binarySearchTree.insert(4);
    expect(binarySearchTree.min()).toBe(4);

    binarySearchTree.insert(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(9);
    expect(binarySearchTree.min()).toBe(2);
  });

  test("max item in the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    expect(binarySearchTree.max()).toBe(null);

    binarySearchTree.insert(6);
    binarySearchTree.insert(4);
    expect(binarySearchTree.max()).toBe(6);

    binarySearchTree.insert(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(9);
    expect(binarySearchTree.max()).toBe(9);
  });

  test("search item in the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();

    expect(binarySearchTree.search(2)).toBe(false);

    binarySearchTree.insert(6);
    binarySearchTree.insert(4);
    expect(binarySearchTree.search(4)).toBe(true);
    expect(binarySearchTree.search(6)).toBe(true);
    expect(binarySearchTree.search(10)).toBe(false);

    binarySearchTree.insert(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(9);
    expect(binarySearchTree.search(5)).toBe(true);
    expect(binarySearchTree.search(2)).toBe(true);
    expect(binarySearchTree.search(9)).toBe(true);
    expect(binarySearchTree.search(90)).toBe(false);
  });

  test("remove item in the BinarySearchTree structure", () => {
    const binarySearchTree = new BinarySearchTree<number>();
    expect(binarySearchTree.size()).toBe(0);

    binarySearchTree.insert(6);
    binarySearchTree.insert(2);
    binarySearchTree.insert(9);
    binarySearchTree.insert(4);
    binarySearchTree.insert(1);
    binarySearchTree.insert(7);

    expect(binarySearchTree.size()).toBe(6);

    binarySearchTree.remove(9)

    const test1 = [] as number[];
    binarySearchTree.inOrderTraverse((key) => test1.push(key));

    expect(test1.toString()).toBe([1, 2, 4, 6, 7].toString());
    expect(binarySearchTree.size()).toBe(5);


    binarySearchTree.remove(1);
    binarySearchTree.remove(6);

    const test2 = [] as number[];
    binarySearchTree.inOrderTraverse((key) => test2.push(key));

    expect(test2.toString()).toBe([2, 4, 7].toString());
    expect(binarySearchTree.size()).toBe(3);
  });
 
});