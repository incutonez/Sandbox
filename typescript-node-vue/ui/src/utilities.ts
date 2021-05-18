export default {
  emptyFn: () => {
    return;
  },
  isObject: (value: any): boolean => {
    return toString.call(value) === '[object Object]';
  },
  isDate: (value: any): boolean => {
    return value instanceof Date;
  },
  isIconTag: (event: Event): boolean => {
    const Target: HTMLElement = event.target as HTMLElement;
    return Target && Target.tagName === 'I';
  }
};
