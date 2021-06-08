// TODO: Potentially wrap underscore methods in here
import _ from 'lodash';

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
  /**
   * underscore's isEmpty treats booleans and numbers as being empty
   */
  isEmpty(value: any): boolean {
    return !_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value);
  },
  isString(value: any): boolean {
    return _.isString(value);
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
  convertToPx(value: string | number) {
    return _.isNumber(value) ? `${value}px` : value;
  }
};
