import utilities from '@/utilities';
import Eventable from '@/mixins/Eventable';
import IBaseCollection from '@/interfaces/IBaseCollection';

/**
 * For some reason, I can't get the module approach to work, so I hackily extend like this
 * See also: https://stackoverflow.com/questions/52968047
 */
interface BaseCollection<T> extends IBaseCollection<T> {

}

class BaseCollection<T> extends Eventable(Array) {
  constructor(type: new (data: T) => T, args?: any) {
    super();
    this.type = type;
  }

  add(args: T | T[]) {
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

  clear() {
    while (this.length) {
      this.pop();
    }
  }
}

export default BaseCollection;
