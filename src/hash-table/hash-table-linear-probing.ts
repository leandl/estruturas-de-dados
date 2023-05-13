import { defaultToString } from "../utils/functions";
import { ValuePair } from "../utils/value-pair";

type CallbackToStringFunction<T> = (value: T) => string;


export class HashTableLinearProbing<KT extends string, VT> {
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

    if (position in this.table) {
      this.table[position] = new ValuePair(key, value);
    } else {
      let index = position;
      while (index in this.table && this.table[index].key !== key) {
        index++;
      }
      this.table[index] = new ValuePair(key, value);
    }
  }

  get(key: KT) {
    const position = this.hashCode(key);

    if (position in this.table) {
      if (this.table[position].key === key) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (index in this.table && this.table[index].key !== key) {
        index++;
      }
      if (index in this.table && this.table[index].key === key) {
        return this.table[position].value;
      }
    }

    return undefined;
  }

  remove(key: KT) {
    const position = this.hashCode(key);

    if (position in this.table) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  private verifyRemoveSideEffect(key: KT, removedPosition: number) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;

    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }

  haskey(key: KT): boolean {
    const position = this.hashCode(key);

    if (position in this.table) {
      if (this.table[position].key === key) {
        return true;
      }
      let index = position + 1;
      while (index in this.table && this.table[index].key !== key) {
        index++;
      }
      if (index in this.table && this.table[index].key === key) {
        return true
      }
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