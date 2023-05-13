import { defaultToString } from "../utils/functions";
import { ValuePair } from "../utils/value-pair";

interface Pair<KT, VT> {
  key: KT;
  value: VT;
}

type CallbackToStringFunction<T> = (value: T) => string;
type CallbackForEachInDictionary<KT, VT> = (key: KT, value: VT) => void;

export class Dictionary<KT extends string, VT> {
  private table: Record<string, ValuePair<KT, VT>> = {};

  constructor(
    private toStringFunction: CallbackToStringFunction<KT> = defaultToString
  ) {}

  haskey(key: KT): boolean {
    const tableKey = this.toStringFunction(key);
    return tableKey in this.table;
  }

  set(key: KT, value: VT): void {
    const tableKey = this.toStringFunction(key);
    this.table[tableKey] = new ValuePair(key, value);
  }

  remove(key: KT): boolean {
    if (this.haskey(key)) {
      const tableKey = this.toStringFunction(key);
      delete this.table[tableKey];
      return true;
    }

    return false;
  }

  private keyValue(key: KT): ValuePair<KT, VT> | undefined {
    const tableKey = this.toStringFunction(key);
    return this.table[tableKey];
  }

  get(key: KT): VT | undefined {
    const valuePair = this.keyValue(key);
    return valuePair?.value;
  }

  keyValues(): Pair<KT, VT>[] {
    const valuesPairs = [] as Pair<KT, VT>[];
    for (const key in this.table) {
      if (Object.prototype.hasOwnProperty.call(this.table, key)) {
        const element = this.table[key];
        valuesPairs.push(element);
      }
    }
    
    return valuesPairs;
  }
  
  keys(): KT[] {
    return this.keyValues().map(({ key }) => key);
  }

  values(): VT[] {
    return this.keyValues().map(({ value }) => value);
  }

  forEach(callback: CallbackForEachInDictionary<KT, VT>) {
    const valuesPairs = this.keyValues();
    valuesPairs.forEach((valuePair) => callback(valuePair.key, valuePair.value))
  }

  size(): number {
    return Object.keys(this.table).length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.table = {};
  }

  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    const valuesPairs = [] as string[];
    for (const key in this.table) {
      if (Object.prototype.hasOwnProperty.call(this.table, key)) {
        const element = this.table[key];
        valuesPairs.push(element.toString());
      }
    }
    
    return valuesPairs.join(",");
  }
}