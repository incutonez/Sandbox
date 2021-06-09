import utilities from '@/utilities';
import IBaseCollection from '@/interfaces/IBaseCollection';
import Base from '@/classes/Base';

/**
 * For some reason, I can't get the module approach to work, so I hackily extend like this
 * See also: https://stackoverflow.com/questions/52968047
 */
interface BaseCollection<T> extends IBaseCollection<T> {

}

class BaseCollection<T> extends Base(Array, ['Eventable']) {
  constructor(type: new (data: T) => T) {
    super();
    this.type = type;
  }

  add(args: T | T[]): void {
    if (!args) {
      return;
    }
    if (!Array.isArray(args)) {
      args = [args];
    }
    args.forEach((item) => {
      if (!utilities.isType(this.type, item)) {
        item = new this.type(item);
      }
      this.push(item);
    });
  }

  first(): T {
    return this[0];
  }

  last(): T {
    return this[this.length - 1];
  }

  clear(): void {
    while (this.length) {
      this.pop();
    }
  }

  count(): number {
    return this.length;
  }
}

export default BaseCollection;