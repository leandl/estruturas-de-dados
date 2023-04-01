import { Deque } from "./deque";

describe('testing the Deque structure', () => {
  test('create the Deque structure', () => {
    const deque = new Deque<any>();
    const emptyArray = [];

    expect(deque.size()).toBe(0);
    expect(deque.toString()).toBe(emptyArray.toString());
  });

  test('add items in the Deque structure', () => {
    const deque = new Deque<number>();

    deque.addBack(2);
    expect(deque.size()).toBe(1);
    expect(deque.toString()).toBe([2].toString());

    deque.removeFront()
    deque.addFront(4)
    deque.addBack(6)
    deque.addFront(9);
    expect(deque.size()).toBe(3);
    expect(deque.toString()).toBe([9, 4, 6].toString());
  });

  test('remove items in the Deque structure', () => {
    const deque = new Deque<number>();
    deque.addBack(2);
    deque.addBack(3);
    deque.addBack(5);
    deque.addBack(9);
    expect(deque.size()).toBe(4);

    const number2 = deque.removeFront();
    expect(deque.size()).toBe(3);
    expect(deque.toString()).toBe([3, 5, 9].toString());
    expect(number2).toBe(2);

    const number9 = deque.removeBack();
    expect(deque.size()).toBe(2);
    expect(deque.toString()).toBe([3, 5].toString());
    expect(number9).toBe(9);

    const number5 = deque.removeBack();
    expect(number5).toBe(5);

    deque.clear();

    const notNumber = deque.removeFront();
    expect(deque.size()).toBe(0);
    expect(deque.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);

    const notNumberAgain = deque.removeBack();
    expect(deque.size()).toBe(0);
    expect(deque.toString()).toBe([].toString());
    expect(notNumberAgain).toBe(undefined);
  });

  test('peek first item in the Deque structure', () => {
    const deque = new Deque<number>();

    deque.addBack(2);
    deque.addBack(3);
    deque.addBack(5);
    const number2 = deque.peekFront();
    expect(number2).toBe(2);

    deque.addBack(7);
    const number7 = deque.peekBack();
    expect(number7).toBe(7);

    deque.removeBack();
    deque.removeFront();

    const number3 = deque.peekFront();
    expect(number3).toBe(3);

    const number5 = deque.peekBack();
    expect(number5).toBe(5);

    deque.clear()
    const notNumber = deque.peekFront();
    expect(notNumber).toBe(undefined);

    const notNumberAgain = deque.peekBack();
    expect(notNumberAgain).toBe(undefined);
  });

  test('the Deque structure is empty', () => {
    const deque = new Deque<number>();
    expect(deque.isEmpty()).toBe(true);

    [1, 2, 5].forEach((e) => {
      deque.addBack(e);
    });
    expect(deque.isEmpty()).toBe(false);

    deque.clear();
    expect(deque.isEmpty()).toBe(true);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      deque.addBack(e);
    });
    deque.removeFront();
    expect(deque.isEmpty()).toBe(false);

    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  test('method clear in the Deque structure', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toBe(0);

    [1, 2, 5, 9].forEach((e) => {
      deque.addBack(e);
    });
    expect(deque.size()).toBe(4);

    deque.clear();
    expect(deque.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      deque.addBack(e);
    });
    expect(deque.size()).toBe(8);

    deque.clear();
    expect(deque.size()).toBe(0);
  });

  test('method size in the Deque structure', () => {
    const deque = new Deque<number>();
    expect(deque.size()).toBe(0);

    deque.addBack(1);
    deque.addFront(2);
    deque.addBack(5);
    deque.addFront(9);
    expect(deque.size()).toBe(4);

    deque.removeBack();
    expect(deque.size()).toBe(3);

    deque.clear();
    expect(deque.size()).toBe(0);
  });
});