export class Common {

  public static deepCopy<T>(source: T): T {
    return Array.isArray(source)
      ? source.map(item => this.deepCopy(item))
      : source instanceof Date
        ? new Date(source.getTime())
        : source && typeof source === 'object'
          ? Object.getOwnPropertyNames(source).reduce((o, prop) => {
            Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
            o[prop] = this.deepCopy(source[prop]);
            return o;
          }, Object.create(Object.getPrototypeOf(source)))
          : source as T;
  }

}

export function sortAlphaNum<T, R>(ao: T, bo: T, mapper): number {
  const aa = mapper(ao);
  const ba = mapper(bo);
  const a = aa?.toString();
  const b = ba?.toString();

  return a?.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'});
}
