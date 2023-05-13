import { HashTableSeparateChaining } from "./hash-table-separate-chaining";

describe('testing the HashTableSeparateChaining structure', () => {
  test('create the HashTableSeparateChaining structure', () => {
    const hashTable = new HashTableSeparateChaining<any, any>();

    expect(hashTable.toString()).toBe([].toString())
  });

  test('put items in the HashTableSeparateChaining structure', () => {
    const hashTable = new HashTableSeparateChaining<string, number>();

    hashTable.put("two", 2)
    expect(hashTable.size()).toBe(1);

    hashTable.put("three", 3);
    hashTable.put("four", 4);
    expect(hashTable.size()).toBe(3);

    hashTable.clear();
    expect(hashTable.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      hashTable.put(String(e), e);
    });
    expect(hashTable.size()).toBe(6);
  });

  test('get items in the HashTableSeparateChaining structure', () => {
    const hashTable = new HashTableSeparateChaining<string, number>();

    expect(hashTable.get("two")).toBe(undefined);
    expect(hashTable.get("three")).toBe(undefined);

    hashTable.put("two", 2);
    hashTable.put("three", 3);

    expect(hashTable.get("two")).toBe(2);
    expect(hashTable.get("three")).toBe(3);
    
    expect(hashTable.get("one")).toBe(undefined);
  });


  test('remove items in the HashTableSeparateChaining structure', () => {
    const hashTable = new HashTableSeparateChaining<string, number>();
    hashTable.put("two", 2);
    hashTable.put("three", 3);
    hashTable.put("five", 5);
    hashTable.put("nine", 9);
    expect(hashTable.size()).toBe(4);

    expect(hashTable.remove("two")).toBe(true);
    expect(hashTable.size()).toBe(3);

    expect(hashTable.remove("nine")).toBe(true);
    expect(hashTable.size()).toBe(2);

    expect(hashTable.remove("ten")).toBe(false);
    expect(hashTable.size()).toBe(2);

    hashTable.clear();

    expect(hashTable.remove("nine")).toBe(false);
    expect(hashTable.size()).toBe(0);
  });


  test('hasKey item in HashTableSeparateChaining structure', () => {
    const hashTable = new HashTableSeparateChaining<string, number>();

    [1, 2, 5].forEach((e) => {
      hashTable.put(String(e), e);
    });
    expect(hashTable.haskey('1')).toBe(true);

    hashTable.remove('1');
    expect(hashTable.haskey('1')).toBe(false);

    expect(hashTable.haskey('5')).toBe(true);
  });
});