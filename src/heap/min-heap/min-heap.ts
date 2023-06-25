import { Compare, CompareFunction, defaultCompare, swap } from "../../utils/functions";


export class MinHeap<T> {
  private heap: T[] = [];
  constructor(protected compareFuntion: CompareFunction<T> = defaultCompare) {}

  private getLeftIndex(index: number): number {
    return (2 * index) + 1;
  }

  private getRightIndex(index: number): number {
    return (2 * index) + 2;
  }

  private getParentIndex(index: number): number | null {
    if (index === 0) {
      return null
    }
    return Math.floor((index - 1) / 2);
  }

  insert(value: T): void {
    const index = this.heap.length;

    this.heap.push(value);
    this.siftUp(index);
  }

  private siftUp(index: number) {
    let parent = this.getParentIndex(index);
    
    while(
      index > 0 &&
      parent !== null &&
      this.compareFuntion(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }

    
  }

  extract(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.shift()!;
    }

    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.siftDown(0);
    return removedValue;
  }

  private siftDown(index: number) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    if (
      left < size && 
      this.compareFuntion(
        this.heap[element],
        this.heap[left]
      ) === Compare.BIGGER_THAN
    ) {
      element = left;
    }

    if (
      right < size &&
      this.compareFuntion(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN
    ) {
      element = right;
    }

    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }


  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() <= 0;
  }

  clear() {
    this.heap = [];
  }

  findMinimum(): T | null {
    return this.isEmpty() ? null : this.heap[0];
  }

}