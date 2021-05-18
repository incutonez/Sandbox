import utilities from '@/utilities';
import IBaseCollection from '@/interfaces/IBaseCollection';

interface BaseCollection<T> extends IBaseCollection<T> {
}

class BaseCollection<T> extends Array<T> {
  events = new EventTarget();

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

  emit(event: string): void {
    this.events.dispatchEvent(new Event(event));
  }

  on(event: string, handler: () => void): void {
    this.events.addEventListener(event, handler);
  }

  off(event: string, handler: () => void): void {
    this.events.removeEventListener(event, handler);
  }
}

export default BaseCollection;
