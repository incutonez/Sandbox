export default {
  isObject: (value: any): boolean => {
    return toString.call(value) === '[object Object]';
  },
  isIconTag: (event: Event): boolean => {
    const Target: HTMLElement = event.target as HTMLElement;
    return Target && Target.tagName === 'I';
  }
};
