export class ValuePair<KT, VT> {
  constructor(
    public readonly key: KT,
    public readonly value: VT
  ) {}

  toString(): string {
    return `[#${this.key}: ${this.value}]`;
  }
}