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
   * underscore's isEmpty treats booleans as being empty, even if it's true
   */
  isEmpty(value: any): boolean {
    return !_.isBoolean(value) && _.isEmpty(value);
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
  }
};
