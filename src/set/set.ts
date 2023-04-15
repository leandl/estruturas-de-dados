
export class Set<T extends string | number | symbol> {
  private items: Record<T, T> = {} as Record<T, T>;

  add(element: T): boolean {
    if (this.has(element)) {
      return false;
    }

    this.items[element] = element;
    return true;
  }

  delete(element: T): boolean {
    if (!this.has(element)) {
      return false;
    }

    delete this.items[element];
    return true;
  }


  has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {} as Record<T, T>;
  }

  size(): number {
    return Object.keys(this.items).length;
  }

  values(): T[] {
    return Object.values(this.items);
  }

  union(otherSet: Set<T>) {
    const unionSet = new Set<T>();

    this.values().forEach((item: T) => unionSet.add(item));
    otherSet.values().forEach((item: T) => unionSet.add(item));

    return unionSet;
  }

  intersection(otherSet: Set<T>) {
    const intersectionSet = new Set<T>();

    this.values().forEach((item: T) => {
      if (otherSet.has(item)) {
        intersectionSet.add(item)
      }
    });

    return intersectionSet;
  }

  defference(otherSet: Set<T>) {
    const intersectionSet = new Set<T>();

    this.values().forEach((item: T) => {
      if (!otherSet.has(item)) {
        intersectionSet.add(item)
      }
    });

    return intersectionSet;
  }

  
  isSubsetOf(otherSet: Set<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }
    
    return this.values().every((item: T) => otherSet.has(item));
  }
}