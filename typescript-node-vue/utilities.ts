import _ from 'lodash';
import {Like, MoreThanOrEqual} from 'typeorm';

function isEmpty<T>(value: T): boolean {
  return !_.isBoolean(value) && !_.isNumber(value) && _.isEmpty(value);
}

function likeDate(value: string): boolean {
  return !isNaN(Date.parse(value));
}

export default {
  isEmpty: isEmpty,
  likeDate: likeDate,
  // Taken from https://stackoverflow.com/a/41957152/1253609
  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
  createWhere(value: any) {
    const out: any = {};
    const obj = _(value).omitBy(_.isNil).value();
    for (const key in obj) {
      const item = obj[key];
      // Let's discard anything that's not set
      if (isEmpty(item)) {
        continue;
      }
      if (likeDate(item)) {
        out[key] = MoreThanOrEqual(item);
      }
      else if (_.isString(item)) {
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