import { Dictionary } from "./dictionary";
import { ValuePair } from "../utils/value-pair";

type Entry<KT, VT> = [KT, VT];

function convertEntryToValuePair<KT, VT>([key, value]: Entry<KT, VT>): ValuePair<KT, VT> {
  return new ValuePair(key, value);
}

function convertArrayValuePairToString<KT, VT>(array: ValuePair<KT, VT>[]): string {
  return array.map(item => item.toString()).join(",");
}

function entriesTestToString<KT, VT>(array: Entry<KT, VT>[]) {
  return convertArrayValuePairToString(array.map(convertEntryToValuePair));
}

describe('testing the Dictionary structure', () => {
  test('create the Dictionary structure', () => {
    const dictionary = new Dictionary<any, any>();

    expect(dictionary.size()).toBe(0);
    expect(dictionary.values().toString()).toBe([].toString())
  });

  test('set items in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    dictionary.set("two", 2)
    expect(dictionary.size()).toBe(1);
    expect(dictionary.values().toString()).toBe([2].toString());


    dictionary.set("three", 3);
    dictionary.set("two", 2);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.values().toString()).toBe([2, 3].toString());

    dictionary.clear();
    expect(dictionary.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      dictionary.set(String(e), e);
    });
    expect(dictionary.size()).toBe(6);
  });

  test('get items in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    dictionary.set("two", 2);
    dictionary.set("three", 3);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.values().toString()).toBe([2, 3].toString());


    
    expect(dictionary.get("two")).toBe(2);
    expect(dictionary.get("three")).toBe(3);
    
    expect(dictionary.get("one")).toBe(undefined);

    dictionary.clear();
    expect(dictionary.size()).toBe(0);
    expect(dictionary.get("two")).toBe(undefined);
    expect(dictionary.get("three")).toBe(undefined);
  });

  test('get keys in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    expect(dictionary.size()).toBe(0);
    expect(dictionary.keys().toString()).toBe([].toString());

    dictionary.set("two", 2);
    dictionary.set("three", 3);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.keys().toString()).toBe(['two', 'three'].toString());


    dictionary.clear();
    expect(dictionary.size()).toBe(0);
    expect(dictionary.keys().toString()).toBe([].toString());
  });

  test('get values in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    expect(dictionary.size()).toBe(0);
    expect(dictionary.values().toString()).toBe([].toString());

    dictionary.set("two", 2);
    dictionary.set("three", 3);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.values().toString()).toBe([2, 3].toString());


    dictionary.clear();
    expect(dictionary.size()).toBe(0);
    expect(dictionary.values().toString()).toBe([].toString());
  });

  test('get keyValues in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    expect(dictionary.size()).toBe(0);
    expect(dictionary.keyValues().toString()).toBe([].toString());

    dictionary.set("two", 2);
    dictionary.set("three", 3);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.keyValues().toString()).toBe(entriesTestToString([["two", 2], ["three", 3]]));


    dictionary.clear();
    expect(dictionary.size()).toBe(0);
    expect(dictionary.keyValues().toString()).toBe([].toString());
  });

  test('remove items in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();
    dictionary.set("two", 2);
    dictionary.set("three", 3);
    dictionary.set("five", 5);
    dictionary.set("nine", 9);
    expect(dictionary.size()).toBe(4);

    expect(dictionary.remove("two")).toBe(true);
    expect(dictionary.size()).toBe(3);
    expect(dictionary.values().toString()).toBe([3, 5, 9].toString());

    expect(dictionary.remove("nine")).toBe(true);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.values().toString()).toBe([3, 5].toString());

    expect(dictionary.remove("ten")).toBe(false);
    expect(dictionary.size()).toBe(2);
    expect(dictionary.values().toString()).toBe([3, 5].toString());

    dictionary.clear();

    expect(dictionary.remove("nine")).toBe(false);
    expect(dictionary.size()).toBe(0);
    expect(dictionary.values().toString()).toBe([].toString());
  });


  test('hasKey item in Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();

    [1, 2, 5].forEach((e) => {
      dictionary.set(String(e), e);
    });
    expect(dictionary.haskey('1')).toBe(true);

    dictionary.remove('1');
    expect(dictionary.haskey('1')).toBe(false);

    expect(dictionary.haskey('5')).toBe(true);

    dictionary.clear();
    expect(dictionary.haskey('5')).toBe(false);
  });

  test('method clear in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();
    expect(dictionary.size()).toBe(0);

    [1, 2, 5, 9].forEach((e) => {
      dictionary.set(String(e), e);
    });
    expect(dictionary.size()).toBe(4);

    dictionary.clear();
    expect(dictionary.size()).toBe(0);

    [1, 2, 5, 9, 1, 2, 3, 4].forEach((e) => {
      dictionary.set(String(e), e);
    });
    expect(dictionary.size()).toBe(6);

    dictionary.clear();
    expect(dictionary.size()).toBe(0);
  });

  test('method size in the Dictionary structure', () => {
    const dictionary = new Dictionary<string, number>();
    expect(dictionary.size()).toBe(0);

    dictionary.set("one", 1);
    dictionary.set("two", 2);
    dictionary.set("five", 5);
    dictionary.set("nine", 9);
    expect(dictionary.size()).toBe(4);

    dictionary.set("nine", 9);
    expect(dictionary.size()).toBe(4);

    dictionary.remove("nine");
    expect(dictionary.size()).toBe(3);

    dictionary.clear();
    expect(dictionary.size()).toBe(0);
  });
});

