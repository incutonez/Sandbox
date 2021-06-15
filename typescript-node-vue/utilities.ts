import _ from 'lodash';
import {Like} from 'typeorm';

function isEmpty<T>(value: T): boolean {
  return !_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value);
}

export default {
  isEmpty: isEmpty,
  createWhere(value: any) {
    const out: any = {};
    const obj = _(value).omitBy(_.isNil).value();
    for (const key in obj) {
      const item = obj[key];
      // Let's discard anything that's not set
      if (isEmpty(item)) {
        continue;
      }
      if (_.isString(item)) {
        // Taken from https://stackoverflow.com/a/55043979/1253609
        out[key] = Like(`%${item}%`);
      }
      else {
        out[key] = item;
      }
    }
    return out;
  }
};