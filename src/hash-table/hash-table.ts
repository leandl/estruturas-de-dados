import { defaultToString } from "../utils/functions";
import { ValuePair } from "../utils/value-pair";

type CallbackToStringFunction<T> = (value: T) => string;
 

export class HashTable<KT extends string, VT> {
  private table: Record<number, ValuePair<KT, VT>> = {};

  constructor(
    private toStringFunction: CallbackToStringFunction<KT> = defaultToString,
    private readonly algorithm: "LOSE-LOSE" | "DJB2" = "DJB2"
  ) {}

  private loseloseHashCode(key: any): number {
    if (typeof key === 'number') {
      return key;
    }

    const tableKey = this.toStringFunction(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }

    return hash % 37;
  }

  private djb2HashCode(key: KT): number {
    const tableKey = this.toStringFunction(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }

    return hash % 1013;
  }

  private hashCode(key: KT): number {
    if (this.algorithm === "DJB2") {
      return this.djb2HashCode(key);
    }

    return this.loseloseHashCode(key);
  }
  put(key: KT, value: VT) {
    const position = this.hashCode(key);
    this.table[position] = new ValuePair(key, value);
  }

  get(key: KT): VT | undefined {
    const position = this.hashCode(key);
    const valuePair = this.table[position];

    return valuePair?.value;
  }

  haskey(key: KT): boolean {
    const position = this.hashCode(key);
    return position in this.table;
  }

  remove(key: KT): boolean {
    if (this.haskey(key)) {
      const position = this.hashCode(key);
      delete this.table[position];
      return true;
    }

    return false;
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
    
    return Object.entries(this.table).map(([key, valuePair]) => `{${key}} => ${valuePair}`).join(",");
  }
}