import { Stack } from './stack-array';

describe('testing the Stack structure', () => {
  test('create the Stack structure', () => {
    const stack = new Stack<any>();
    const emptyArray = [];

    expect(stack.size()).toBe(0);
    expect(stack.toString()).toBe(emptyArray.toString());
  });

  test('add items in the Stack structure', () => {
    const stack = new Stack<number>();

    stack.push(2);
    expect(stack.size()).toBe(1);
    expect(stack.toString()).toBe([2].toString());

    stack.push(4, 6, 9);
    expect(stack.size()).toBe(4);
    expect(stack.toString()).toBe([2, 4, 6, 9].toString());
  });
  

  test('remove items in the Stack structure', () => {
    const stack = new Stack<number>();
    stack.push(2, 3, 5);
    expect(stack.size()).toBe(3);

    const number5 = stack.pop();
    expect(stack.size()).toBe(2);
    expect(stack.toString()).toBe([2, 3].toString());
    expect(number5).toBe(5);

    const number3 = stack.pop();
    expect(stack.size()).toBe(1);
    expect(stack.toString()).toBe([2].toString());
    expect(number3).toBe(3);

    stack.pop();
    const notNumber = stack.pop()
    expect(stack.size()).toBe(0);
    expect(stack.toString()).toBe([].toString());
    expect(notNumber).toBe(undefined);
  });

  test('peek first item in the Stack structure', () => {
    const stack = new Stack<number>();

    stack.push(2, 3, 5);
    const number5 = stack.peek();
    expect(number5).toBe(5);

    stack.push(2);
    const number2 = stack.peek();
    expect(number2).toBe(2);

    stack.pop();
    stack.pop();
    const number3 = stack.peek();
    expect(number3).toBe(3);

    stack.clear()
    const notNumber = stack.peek();
    expect(notNumber).toBe(undefined);
  });


  test('the Stack structure is empty', () => {
    const stack = new Stack<number>();
    expect(stack.isEmpty()).toBe(true);

    stack.push(1, 2, 5, 9);
    expect(stack.isEmpty()).toBe(false);

    stack.clear();
    expect(stack.isEmpty()).toBe(true);

    stack.push(1, 2, 5, 9, 1, 2, 3, 4);
    expect(stack.isEmpty()).toBe(false);

    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });

  test('method clear in the Stack structure', () => {
    const stack = new Stack<number>();
    expect(stack.size()).toBe(0);

    stack.push(1, 2, 5, 9);
    expect(stack.size()).toBe(4);

    stack.clear();
    expect(stack.size()).toBe(0);

    stack.push(1, 2, 5, 9, 1, 2, 3, 4);
    expect(stack.size()).toBe(8);

    stack.clear();
    expect(stack.size()).toBe(0);
  });

  test('method size in the Stack structure', () => {
    const stack = new Stack<number>();
    expect(stack.size()).toBe(0);

    stack.push(1, 2, 5, 9);
    expect(stack.size()).toBe(4);

    stack.pop();
    expect(stack.size()).toBe(3);

    stack.clear();
    expect(stack.size()).toBe(0);
  });
});