// TODO: Potentially wrap underscore methods in here
import _ from 'lodash';

export default {
  identityFn: _.identity,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  isType<T>(type: any, value: T): boolean {
    return value instanceof type;
  },
  isDefined<T>(value: T): boolean {
    return value !== undefined;
  },
  /**
   * underscore's isEmpty treats booleans and numbers as being empty
   */
  isEmpty<T>(value: T): boolean {
    return !(_.isBoolean(value) || _.isNumber(value) || _.isDate(value)) && _.isEmpty(value);
  },
  isString: _.isString,
  isObject: _.isObject,
  isDate: _.isDate,
  isFunction: _.isFunction,
  isNumber: _.isNumber,
  isArray: _.isArray,
  remove: _.remove,
  merge: _.merge,
  insert(item: any[], index: number, value: any) {
    item.splice(index, 0, value);
  },
  isIconTag(event: Event): boolean {
    const Target: HTMLElement = event.target as HTMLElement;
    return Target && Target.tagName === 'I';
  },
  convertToPx(value: string | number): string {
    return _.isNumber(value) ? `${value}px` : value;
  }
};
