// TODO: Potentially wrap underscore methods in here
import _ from 'lodash';

export default {
  emptyFn(): void {
    return;
  },
  identityFn: _.identity,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  isType<T>(type: any, value: T): boolean {
    return value instanceof type;
  },
  /**
   * underscore's isEmpty treats booleans and numbers as being empty
   */
  isEmpty<T>(value: T): boolean {
    return !_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value);
  },
  isString: _.isString,
  isObject: _.isObject,
  isDate: _.isDate,
  isIconTag(event: Event): boolean {
    const Target: HTMLElement = event.target as HTMLElement;
    return Target && Target.tagName === 'I';
  },
  convertToPx(value: string | number): string {
    return _.isNumber(value) ? `${value}px` : value;
  }
};