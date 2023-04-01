import { Queue } from "./queue";

describe('testing the Queue structure', () => {
  test('create the Queue structure', () => {
    const queue = new Queue<any>();
    const emptyArray = [];

    expect(queue.size()).toBe(0);
    expect(queue.toString()).toBe(emptyArray.toString());
  });

  test('add items in the Queue structure', () => {
    const queue = new Queue<number>();

    queue.enqueue(2);
    expect(queue.size()).toBe(1);
    expect(queue.toString()).toBe([2].toString());

    queue.enqueue(4)
    queue.enqueue(6)
    queue.enqueue(9);
    expect(queue.size()).toBe(4);
    expect(queue.toString()).toBe([2, 4, 6, 9].toString());
  });

  test('remove items in the Queue structure', () => {
    const queue = new Queue<number>();
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(5);
    expect(queue.size()).toBe(3);

    const number2 = queue.dequeue();
    expect(queue.size()).toBe(2);
    expect(queue.toString()).toBe([3, 5].toString());
    expect(number2).toBe(2);

    const number3 = queue.dequeue();
    expect(queue.size()).toBe(1);
    expect(queue.toString()).toBe([5].toString());
    expect(number3).toBe(3);

    const number5 = queue.dequeue();
    expect(number5).toBe(5);

    const notNumber = queue.dequeue();
    expect(queue.size()).toBe(0);
    expect(queue.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('peek first item in the Queue structure', () => {
    const queue = new Queue<number>();

    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(5);
    const number2 = queue.peek();
    expect(number2).toBe(2);

    queue.enqueue(7);
    const number2Again = queue.peek();
    expect(number2Again).toBe(2);

    queue.dequeue();
    queue.dequeue();
    const number5 = queue.peek();
    expect(number5).toBe(5);

    queue.clear()
    const notNumber = queue.peek();
    expect(notNumber).toBe(undefined);
  });

  test('the Queue structure is empty', () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBe(true);

    [1, 2, 5].forEach((e) => {
      queue.enqueue(e);
    });
    expect(queue.isEmpty()).toBe(false);

    queue.clear();
    expect(queue.isEmpty()).toBe(true);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      queue.enqueue(e);
    });
    expect(queue.isEmpty()).toBe(false);

    queue.clear();
    expect(queue.isEmpty()).toBe(true);
  });

  test('method clear in the Queue structure', () => {
    const queue = new Queue<number>();
    expect(queue.size()).toBe(0);

    [1, 2, 5, 9].forEach((e) => {
      queue.enqueue(e);
    });
    expect(queue.size()).toBe(4);

    queue.clear();
    expect(queue.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      queue.enqueue(e);
    });
    expect(queue.size()).toBe(8);

    queue.clear();
    expect(queue.size()).toBe(0);
  });

  test('method size in the Queue structure', () => {
    const queue = new Queue<number>();
    expect(queue.size()).toBe(0);

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(5);
    queue.enqueue(9);
    expect(queue.size()).toBe(4);

    queue.dequeue();
    expect(queue.size()).toBe(3);

    queue.clear();
    expect(queue.size()).toBe(0);
  });
});