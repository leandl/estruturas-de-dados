import { reverseCompare, CompareFunction, defaultCompare } from "../../utils/functions";
import { MinHeap } from "../min-heap/min-heap";


export class MaxHeap<T> extends MinHeap<T> {

  constructor(compareFuntion: CompareFunction<T> = defaultCompare) {
    const compareReverseFuntion = reverseCompare(compareFuntion);
    super(compareReverseFuntion);
  }
}