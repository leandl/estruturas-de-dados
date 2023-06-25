import { MaxHeap } from "./max-heap";

describe('testing the MaxHeap structure', () => {
  test('create the MaxHeap structure', () => {
    const maxHeap = new MaxHeap<any>();
    expect(maxHeap.size()).toBe(0);
  });

  test('add items in the MaxHeap structure', () => {
    const maxHeap = new MaxHeap<number>();

    maxHeap.insert(2);
    expect(maxHeap.size()).toBe(1);

    maxHeap.insert(6);
    maxHeap.insert(9);
    maxHeap.insert(4);
    expect(maxHeap.size()).toBe(4);
  });

  test('clear items in the MaxHeap structure', () => {
    const maxHeap = new MaxHeap<number>();

    maxHeap.insert(2);
    expect(maxHeap.size()).toBe(1);
    expect(maxHeap.isEmpty()).toBe(false);
    maxHeap.clear();
    expect(maxHeap.size()).toBe(0);
    expect(maxHeap.isEmpty()).toBe(true);

    maxHeap.insert(6);
    maxHeap.insert(9);
    maxHeap.insert(4);
    expect(maxHeap.size()).toBe(3);
    expect(maxHeap.isEmpty()).toBe(false);
    maxHeap.clear();
    expect(maxHeap.size()).toBe(0);
    expect(maxHeap.isEmpty()).toBe(true);
  });


  test('extract items in the MaxHeap structure', () => {
    const maxHeap = new MaxHeap<number>();
    
    maxHeap.insert(6);
    maxHeap.insert(9);
    maxHeap.insert(2);
    maxHeap.insert(4);

    
    expect(maxHeap.extract()).toBe(9);
    expect(maxHeap.extract()).toBe(6);
    expect(maxHeap.extract()).toBe(4);
    expect(maxHeap.extract()).toBe(2);

    expect(maxHeap.size()).toBe(0);
    expect(maxHeap.isEmpty()).toBe(true);
  });
});