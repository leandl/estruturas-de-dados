import { LinkedList } from "./linked-list";

describe('testing the LinkedList structure', () => {
  test('create the LinkedList structure', () => {
    const linkedList = new LinkedList<any>();
    const emptyArray = [];

    expect(linkedList.size()).toBe(0);
    expect(linkedList.toString()).toBe(emptyArray.toString());
  });

  test('add items in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();

    linkedList.push(2);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.toString()).toBe([2].toString());

    linkedList.push(4)
    linkedList.push(6)
    linkedList.push(9);
    expect(linkedList.size()).toBe(4);
    expect(linkedList.toString()).toBe([2, 4, 6, 9].toString());
  });

  test('remove items by possition in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    expect(linkedList.size()).toBe(3);

    const number5 = linkedList.removeAt(2);
    expect(linkedList.size()).toBe(2);
    expect(linkedList.toString()).toBe([2, 3].toString());
    expect(number5).toBe(5);

    const number2 = linkedList.removeAt(0);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.toString()).toBe([3].toString());
    expect(number2).toBe(2);

    const number3 = linkedList.removeAt(0);
    expect(number3).toBe(3);

    const notNumber = linkedList.removeAt(0);
    expect(linkedList.size()).toBe(0);
    expect(linkedList.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('remove items in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    expect(linkedList.size()).toBe(3);

    const number5 = linkedList.remove(5);
    expect(linkedList.size()).toBe(2);
    expect(linkedList.toString()).toBe([2, 3].toString());
    expect(number5).toBe(5);

    const number2 = linkedList.remove(2);
    expect(linkedList.size()).toBe(1);
    expect(linkedList.toString()).toBe([3].toString());
    expect(number2).toBe(2);

    const number3 = linkedList.remove(3);
    expect(number3).toBe(3);

    const notNumber = linkedList.remove(15);
    expect(linkedList.size()).toBe(0);
    expect(linkedList.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('get item in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    expect(linkedList.size()).toBe(3);

    const number5 = linkedList.getAt(2);
    expect(number5).toBe(5);

    const number2 = linkedList.getAt(0);
    expect(number2).toBe(2);

    const number3 = linkedList.getAt(1);
    expect(number3).toBe(3);

    const notNumber = linkedList.getAt(-1);
    expect(notNumber).toBe(undefined);

    const notNumberAgain = linkedList.getAt(3);
    expect(notNumberAgain).toBe(undefined);
  });

  test('get position of an item in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    expect(linkedList.size()).toBe(3);

    const number5 = linkedList.indexOf(5);
    expect(number5).toBe(2);

    const number2 = linkedList.indexOf(2);
    expect(number2).toBe(0);

    const number3 = linkedList.indexOf(3);
    expect(number3).toBe(1);

    const notNumber = linkedList.indexOf(-1);
    expect(notNumber).toBe(-1);

    const notNumberAgain = linkedList.indexOf(15);
    expect(notNumberAgain).toBe(-1);
  });

  test('insert item in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    expect(linkedList.size()).toBe(3);

    expect(linkedList.insert(15, 0)).toBe(true);
    expect(linkedList.size()).toBe(4);
    expect(linkedList.toString()).toBe([15,2,3,5].toString());

    expect(linkedList.insert(13, 2)).toBe(true);
    expect(linkedList.size()).toBe(5);
    expect(linkedList.toString()).toBe([15,2,13,3,5].toString());

    expect(linkedList.insert(20, 5)).toBe(true);
    expect(linkedList.size()).toBe(6);
    expect(linkedList.toString()).toBe([15,2,13,3,5,20].toString());

    expect(linkedList.insert(40, -1)).toBe(false);
    expect(linkedList.insert(40, 7)).toBe(false);
  });

  test('peek head item in Linked List structure', () => {
    const linkedList = new LinkedList<number>();

    linkedList.push(2);
    linkedList.push(3);
    linkedList.push(5);
    const number2 = linkedList.getHead();
    expect(number2).toBe(2);

    linkedList.push(7);
    const number2Again = linkedList.getHead();
    expect(number2Again).toBe(2);

    linkedList.removeAt(0);
    linkedList.removeAt(0);
    const number5 = linkedList.getHead();
    expect(number5).toBe(5);

    linkedList.removeAt(0);
    linkedList.removeAt(0);
    const notNumber = linkedList.getHead();
    expect(notNumber).toBe(undefined);
  });

  test('the LinkedList structure is empty', () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.isEmpty()).toBe(true);

    [1, 2, 5].forEach((e) => {
      linkedList.push(e);
    });
    expect(linkedList.isEmpty()).toBe(false);

    [1, 2, 5].forEach((e) => {
      linkedList.remove(e);
    });
    expect(linkedList.isEmpty()).toBe(true);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      linkedList.push(e);
    });
    expect(linkedList.isEmpty()).toBe(false);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      linkedList.remove(e);
    });
    expect(linkedList.isEmpty()).toBe(true);
  });


  test('method size in the LinkedList structure', () => {
    const linkedList = new LinkedList<number>();
    expect(linkedList.size()).toBe(0);

    linkedList.push(1);
    linkedList.push(2);
    linkedList.push(5);
    linkedList.push(9);
    expect(linkedList.size()).toBe(4);

    linkedList.removeAt(0);
    expect(linkedList.size()).toBe(3);

    linkedList.removeAt(0);
    linkedList.removeAt(0);
    linkedList.removeAt(0);
    expect(linkedList.size()).toBe(0);
  });
});