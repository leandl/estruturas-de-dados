import { MinHeap } from "./min-heap";

describe('testing the MinHeap structure', () => {
  test('create the MinHeap structure', () => {
    const minHeap = new MinHeap<any>();
    expect(minHeap.size()).toBe(0);
  });

  test('add items in the MinHeap structure', () => {
    const minHeap = new MinHeap<number>();

    minHeap.insert(2);
    expect(minHeap.size()).toBe(1);

    minHeap.insert(6);
    minHeap.insert(9);
    minHeap.insert(4);
    expect(minHeap.size()).toBe(4);
  });

  test('clear items in the MinHeap structure', () => {
    const minHeap = new MinHeap<number>();

    minHeap.insert(2);
    expect(minHeap.size()).toBe(1);
    expect(minHeap.isEmpty()).toBe(false);
    minHeap.clear();
    expect(minHeap.size()).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);

    minHeap.insert(6);
    minHeap.insert(9);
    minHeap.insert(4);
    expect(minHeap.size()).toBe(3);
    expect(minHeap.isEmpty()).toBe(false);
    minHeap.clear();
    expect(minHeap.size()).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);
  });


  test('extract items in the MinHeap structure', () => {
    const minHeap = new MinHeap<number>();
    
    minHeap.insert(6);
    minHeap.insert(9);
    minHeap.insert(2);
    minHeap.insert(4);
    
    expect(minHeap.extract()).toBe(2);
    expect(minHeap.extract()).toBe(4);
    expect(minHeap.extract()).toBe(6);
    expect(minHeap.extract()).toBe(9);

    expect(minHeap.size()).toBe(0);
    expect(minHeap.isEmpty()).toBe(true);
  });
});