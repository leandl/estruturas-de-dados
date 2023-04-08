import { DoublyLinkedList } from "./doubly-linked-list";

describe('testing the DoublyLinkedList structure', () => {
  test('create the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<any>();
    const emptyArray = [];

    expect(doublyLinkedList.size()).toBe(0);
    expect(doublyLinkedList.toString()).toBe(emptyArray.toString());
  });

  test('add items in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();

    doublyLinkedList.push(2);
    expect(doublyLinkedList.size()).toBe(1);
    expect(doublyLinkedList.toString()).toBe([2].toString());

    doublyLinkedList.push(4)
    doublyLinkedList.push(6)
    doublyLinkedList.push(9);
    expect(doublyLinkedList.size()).toBe(4);
    expect(doublyLinkedList.toString()).toBe([2, 4, 6, 9].toString());
  });

  test('remove items by possition in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.size()).toBe(3);

    const number5 = doublyLinkedList.removeAt(2);
    expect(doublyLinkedList.size()).toBe(2);
    expect(doublyLinkedList.toString()).toBe([2, 3].toString());
    expect(number5).toBe(5);

    const number2 = doublyLinkedList.removeAt(0);
    expect(doublyLinkedList.size()).toBe(1);
    expect(doublyLinkedList.toString()).toBe([3].toString());
    expect(number2).toBe(2);

    const number3 = doublyLinkedList.removeAt(0);
    expect(number3).toBe(3);

    const notNumber = doublyLinkedList.removeAt(0);
    expect(doublyLinkedList.size()).toBe(0);
    expect(doublyLinkedList.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('remove items in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.size()).toBe(3);

    const number5 = doublyLinkedList.remove(5);
    expect(doublyLinkedList.size()).toBe(2);
    expect(doublyLinkedList.toString()).toBe([2, 3].toString());
    expect(number5).toBe(5);

    const number2 = doublyLinkedList.remove(2);
    expect(doublyLinkedList.size()).toBe(1);
    expect(doublyLinkedList.toString()).toBe([3].toString());
    expect(number2).toBe(2);

    const number3 = doublyLinkedList.remove(3);
    expect(number3).toBe(3);

    const notNumber = doublyLinkedList.remove(15);
    expect(doublyLinkedList.size()).toBe(0);
    expect(doublyLinkedList.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('get item in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.size()).toBe(3);

    const number5 = doublyLinkedList.getAt(2);
    expect(number5).toBe(5);

    const number2 = doublyLinkedList.getAt(0);
    expect(number2).toBe(2);

    const number3 = doublyLinkedList.getAt(1);
    expect(number3).toBe(3);

    const notNumber = doublyLinkedList.getAt(-1);
    expect(notNumber).toBe(undefined);

    const notNumberAgain = doublyLinkedList.getAt(3);
    expect(notNumberAgain).toBe(undefined);
  });

  test('get position of an item in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.size()).toBe(3);

    const number5 = doublyLinkedList.indexOf(5);
    expect(number5).toBe(2);

    const number2 = doublyLinkedList.indexOf(2);
    expect(number2).toBe(0);

    const number3 = doublyLinkedList.indexOf(3);
    expect(number3).toBe(1);

    const notNumber = doublyLinkedList.indexOf(-1);
    expect(notNumber).toBe(-1);

    const notNumberAgain = doublyLinkedList.indexOf(15);
    expect(notNumberAgain).toBe(-1);
  });

  test('insert item in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    expect(doublyLinkedList.size()).toBe(3);

    expect(doublyLinkedList.insert(15, 0)).toBe(true);
    expect(doublyLinkedList.size()).toBe(4);
    expect(doublyLinkedList.toString()).toBe([15,2,3,5].toString());

    expect(doublyLinkedList.insert(13, 2)).toBe(true);
    expect(doublyLinkedList.size()).toBe(5);
    expect(doublyLinkedList.toString()).toBe([15,2,13,3,5].toString());

    expect(doublyLinkedList.insert(20, 5)).toBe(true);
    expect(doublyLinkedList.size()).toBe(6);
    expect(doublyLinkedList.toString()).toBe([15,2,13,3,5,20].toString());

    expect(doublyLinkedList.insert(40, -1)).toBe(false);
    expect(doublyLinkedList.insert(40, 7)).toBe(false);
  });

  test('peek head item in Linked List structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();

    doublyLinkedList.push(2);
    doublyLinkedList.push(3);
    doublyLinkedList.push(5);
    const number2 = doublyLinkedList.getHead();
    expect(number2).toBe(2);

    doublyLinkedList.push(7);
    const number2Again = doublyLinkedList.getHead();
    expect(number2Again).toBe(2);

    doublyLinkedList.removeAt(0);
    doublyLinkedList.removeAt(0);
    const number5 = doublyLinkedList.getHead();
    expect(number5).toBe(5);

    doublyLinkedList.removeAt(0);
    doublyLinkedList.removeAt(0);
    const notNumber = doublyLinkedList.getHead();
    expect(notNumber).toBe(undefined);
  });

  test('the DoublyLinkedList structure is empty', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    expect(doublyLinkedList.isEmpty()).toBe(true);

    [1, 2, 5].forEach((e) => {
      doublyLinkedList.push(e);
    });
    expect(doublyLinkedList.isEmpty()).toBe(false);

    [1, 2, 5].forEach((e) => {
      doublyLinkedList.remove(e);
    });
    expect(doublyLinkedList.isEmpty()).toBe(true);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      doublyLinkedList.push(e);
    });
    expect(doublyLinkedList.isEmpty()).toBe(false);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      doublyLinkedList.remove(e);
    });
    expect(doublyLinkedList.isEmpty()).toBe(true);
  });


  test('method size in the DoublyLinkedList structure', () => {
    const doublyLinkedList = new DoublyLinkedList<number>();
    expect(doublyLinkedList.size()).toBe(0);

    doublyLinkedList.push(1);
    doublyLinkedList.push(2);
    doublyLinkedList.push(5);
    doublyLinkedList.push(9);
    expect(doublyLinkedList.size()).toBe(4);

    doublyLinkedList.removeAt(0);
    expect(doublyLinkedList.size()).toBe(3);

    doublyLinkedList.removeAt(0);
    doublyLinkedList.removeAt(0);
    doublyLinkedList.removeAt(0);
    expect(doublyLinkedList.size()).toBe(0);
  });
});