export default {
  emptyFn() {
    return;
  },
  isType(type: any, value: any): boolean {
    return value instanceof type;
  },
  isObject(value: any): boolean {
    return toString.call(value) === '[object Object]';
  },
  isDate(value: any): boolean {
    return value instanceof Date;
  },
  isIconTag(event: Event): boolean {
    const Target: HTMLElement = event.target as HTMLElement;
    return Target && Target.tagName === 'I';
  },
  /**
   * Taken from https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
   */
  applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
        );
      });
    });
  }
};
