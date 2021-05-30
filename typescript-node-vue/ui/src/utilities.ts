// TODO: Potentially wrap underscore methods in here
export default {
  emptyFn(): void {
    return;
  },
  identityFn(value: any) {
    return value;
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
  }
};
