// TODO: Potentially wrap underscore methods in here
import _ from 'lodash';

export default {
  emptyFn(): void {
    return;
  },
  identityFn: _.identity,
  isType(type: any, value: any): boolean {
    return value instanceof type;
  },
  /**
   * underscore's isEmpty treats booleans and numbers as being empty
   */
  isEmpty(value: any): boolean {
    return !_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value);
  },
  isString: _.isString,
  isObject(value: any): boolean {
    return _.isObject(value);
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
