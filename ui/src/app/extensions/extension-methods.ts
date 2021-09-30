import {Common, sortAlphaNum} from "./common";

export {};

// region Ordered Array Stuff

enum Order {
  Ascending = 'ascending',
  Descending = 'descending'
}

interface OrderedArrayModel<V> {
  orderedProperty: ((element: V) => any);
  order: Order
}

export class OrderedArray<V> {

  // region Fields

  list: V[];
  orderedProperties: OrderedArrayModel<V>[];

  // endregion

  // region Constructor

  constructor() {
    this.list = [];
    this.orderedProperties = [];
  }

  // endregion

  // region Linq

  public toArray(): V[] {
    for (let i = this.orderedProperties.length - 1; i >= 0; i--) {
      const model = this.orderedProperties[i];
      switch (model.order) {
        case Order.Ascending:
          this.list.sort((a, b) => sortAlphaNum(a, b, model.orderedProperty));
          break;
        case Order.Descending:
          this.list.sort((a, b) => sortAlphaNum(b, a, model.orderedProperty));
          break;
      }
    }

    return this.list;
  }

  public thenBy<R>(mapper: (element: V) => R): OrderedArray<V> {
    this.orderedProperties.push(<OrderedArrayModel<V>>{orderedProperty: mapper, order: Order.Ascending});
    return this;
  }

  public thenByDescending<R>(mapper: (element: V) => R): OrderedArray<V> {
    this.orderedProperties.push(<OrderedArrayModel<V>>{orderedProperty: mapper, order: Order.Descending});
    return this;
  }

  // endregion

}

// endregion

declare global {

  // region String

  interface String {
    hasValue(): boolean;

    equals(obj: string): boolean;
  }

  // endregion

  // region Number

  interface Number {
    hasValue(): boolean;
  }

  // endregion

  // region Array

  interface Array<T> {
    groupBy<K>(mapper: (element: T) => K): Map<K, T[]>;

    orderBy<K>(mapper: (element: T) => K): OrderedArray<T>;

    orderByDescending<K>(mapper: (element: T) => K): OrderedArray<T>;

    distinctBy<K>(mapper: (element: T) => K): T[];

    count(mapper: (element: T) => boolean): number;
  }

  // endregion

  // region Date

  interface Date {
    date(): Date;

    compare(date: Date): boolean;

    adjust(): Date;
  }

  // endregion

}

// region String

String.prototype.hasValue = function (): boolean {
  return this !== "" && this.match(/^ *$/) === null;
}

String.prototype.equals = function (obj: string): boolean {
  return this === obj;
}

// endregion

// region Number

Number.prototype.hasValue = function (): boolean {
  return this != null;
}

// endregion

// region Array

Array.prototype.groupBy = function <K, T>(mapper: (element: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  this.forEach((item) => {
    const key = mapper(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return map;
}

Array.prototype.orderBy = function <K, T>(mapper: (element: T) => K): OrderedArray<T> {
  const orderedArray = new OrderedArray<T>();
  orderedArray.list = Common.deepCopy(this);
  orderedArray.orderedProperties.push(<OrderedArrayModel<T>>{orderedProperty: mapper, order: Order.Ascending});
  return orderedArray;
}

Array.prototype.orderByDescending = function <K, T>(mapper: (element: T) => K): OrderedArray<T> {
  const orderedArray = new OrderedArray<T>();
  orderedArray.list = Common.deepCopy(this);
  orderedArray.orderedProperties.push(<OrderedArrayModel<T>>{orderedProperty: mapper, order: Order.Descending});
  return orderedArray;
}

Array.prototype.distinctBy = function <K, T>(mapper: (element: T) => K): T[] {
  return this.filter((value, index) => this.findIndex(ii => {
    if (mapper) {
      return mapper(ii) === mapper(value);
    }

    return ii === value;
  }) === index);
}

Array.prototype.count = function <T>(mapper: (element: T) => boolean): number {
  const clone: T[] = Common.deepCopy(this);
  const filter = clone.filter(mapper);
  return filter.length;
}

// endregion

// region Date

Date.prototype.date = function (): Date {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}

Date.prototype.compare = function (date: Date): boolean {
  const oy: number = this.getFullYear();
  const om: number = this.getMonth();
  const od: number = this.getDate();
  const ot: number = this.getTime();
  const ny: number = date.getFullYear();
  const nm: number = date.getMonth();
  const nd: number = date.getDate();
  const nt: number = this.getTime();
  return oy == ny && om == nm && od == nd && ot == nt;
}

Date.prototype.adjust = function (): Date {
  return null;
  // return adjustHITSTime(this, false);
}

// endregion
