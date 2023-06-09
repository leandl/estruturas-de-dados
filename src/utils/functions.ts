export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}

export function defaultToString(item: any): string {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }

  return item.toString() as string;
}

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

export type CompareFunction<T> = (a: T, b: T) => Compare;

export function lesserEquals<T>(a: T, b: T, compareFn: CompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

export function biggerEquals<T>(a: T, b: T, compareFn: CompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}


export function reverseCompare<T>(compareFunction: CompareFunction<T>): CompareFunction<T> {
  return (a: T, b: T) => compareFunction(b, a);
}

export function swap<T>(array: T[], a: number, b: number) {
  [array[b], array[a]] = [array[a], array[b]];
}