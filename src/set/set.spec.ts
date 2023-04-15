import { Set } from "./set";

describe('testing the Set structure', () => {
  test('create the Set structure', () => {
    const set = new Set<any>();
    const emptyArray = [];

    expect(set.size()).toBe(0);
    expect(set.values().toString()).toBe(emptyArray.toString());
  });

  test('add items in the Set structure', () => {
    const set = new Set<number>();

    expect(set.add(2)).toBe(true);
    expect(set.size()).toBe(1);
    expect(set.values().toString()).toBe([2].toString());


    expect(set.add(3)).toBe(true);
    expect(set.add(2)).toBe(false);
    expect(set.add(3)).toBe(false);
    expect(set.size()).toBe(2);
    expect(set.values().toString()).toBe([2, 3].toString());
  });

  test('delete items in the Set structure', () => {
    const set = new Set<number>();
    set.add(2);
    set.add(3);
    set.add(5);
    set.add(9);
    expect(set.size()).toBe(4);

    expect(set.delete(2)).toBe(true);
    expect(set.size()).toBe(3);
    expect(set.values().toString()).toBe([3, 5, 9].toString());

    expect(set.delete(9)).toBe(true);
    expect(set.size()).toBe(2);
    expect(set.values().toString()).toBe([3, 5].toString());

    expect(set.delete(10)).toBe(false);
    expect(set.size()).toBe(2);
    expect(set.values().toString()).toBe([3, 5].toString());

    set.clear();

    expect(set.delete(9)).toBe(false);
    expect(set.size()).toBe(0);
    expect(set.values().toString()).toBe([].toString());
  });


  test('has item in Set structure', () => {
    const set = new Set<number>();

    [1, 2, 5].forEach((e) => {
      set.add(e);
    });
    expect(set.has(1)).toBe(true);

    set.delete(1);
    expect(set.has(1)).toBe(false);

    expect(set.has(5)).toBe(true);

    set.clear();
    expect(set.has(5)).toBe(false);
  });

  test('method clear in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);

    [1, 2, 5, 9].forEach((e) => {
      set.add(e);
    });
    expect(set.size()).toBe(4);

    set.clear();
    expect(set.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      set.add(e);
    });
    expect(set.size()).toBe(6);

    set.clear();
    expect(set.size()).toBe(0);
  });

  test('method size in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);

    set.add(1);
    set.add(2);
    set.add(5);
    set.add(9);
    expect(set.size()).toBe(4);

    set.add(9);
    expect(set.size()).toBe(4);

    set.delete(9);
    expect(set.size()).toBe(3);

    set.clear();
    expect(set.size()).toBe(0);
  });

  test('method union in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);

    set.add(1);
    set.add(2);
    set.add(5);
    set.add(9);
    expect(set.size()).toBe(4);
    expect(set.values().toString()).toBe([1, 2, 5, 9].toString());

    const otherSet = new Set<number>();
    otherSet.add(1);
    otherSet.add(3);
    otherSet.add(2);
    otherSet.add(10);
    expect(otherSet.size()).toBe(4);
    expect(otherSet.values().toString()).toBe([1, 2, 3, 10].toString());

    const unionSet = set.union(otherSet);
    expect(unionSet.size()).toBe(6);
    expect(unionSet.values().toString()).toBe([1, 2, 3, 5, 9, 10].toString());
  });
  
  test('method intersection in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);

    set.add(1);
    set.add(2);
    set.add(5);
    set.add(9);
    expect(set.size()).toBe(4);
    expect(set.values().toString()).toBe([1, 2, 5, 9].toString());

    const otherSet = new Set<number>();
    otherSet.add(3);
    otherSet.add(2);
    otherSet.add(10);
    otherSet.add(1);
    expect(otherSet.size()).toBe(4);
    expect(otherSet.values().toString()).toBe([1, 2, 3, 10].toString());

    const intersectionSet = set.intersection(otherSet);
    expect(intersectionSet.size()).toBe(2);
    expect(intersectionSet.values().toString()).toBe([1, 2].toString());
  });

  test('method defference in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);

    set.add(1);
    set.add(2);
    set.add(5);
    set.add(9);
    expect(set.size()).toBe(4);
    expect(set.values().toString()).toBe([1, 2, 5, 9].toString());

    const otherSet = new Set<number>();
    otherSet.add(3);
    otherSet.add(2);
    otherSet.add(10);
    otherSet.add(1);
    expect(otherSet.size()).toBe(4);
    expect(otherSet.values().toString()).toBe([1, 2, 3, 10].toString());

    const defferenceSet = set.defference(otherSet);
    expect(defferenceSet.size()).toBe(2);
    expect(defferenceSet.values().toString()).toBe([5, 9].toString());

    const defferenceOtherSet = otherSet.defference(set);
    expect(defferenceOtherSet.size()).toBe(2);
    expect(defferenceOtherSet.values().toString()).toBe([3, 10].toString());
  });

  test('method isSubsetOf in the Set structure', () => {
    const set = new Set<number>();
    expect(set.size()).toBe(0);
    set.add(1);
    set.add(2);
    set.add(5);
    set.add(9);

    const otherSet = new Set<number>();
    otherSet.add(1);
    otherSet.add(2);
    
    expect(set.isSubsetOf(otherSet)).toBe(false);
    expect(set.isSubsetOf(set)).toBe(true);
    expect(otherSet.isSubsetOf(set)).toBe(true);

    const setEmpty = new Set<number>();
    expect(setEmpty.isSubsetOf(set)).toBe(true);
    expect(setEmpty.isSubsetOf(otherSet)).toBe(true);
    expect(set.isSubsetOf(setEmpty)).toBe(false);
    expect(otherSet.isSubsetOf(setEmpty)).toBe(false);
  });
});

