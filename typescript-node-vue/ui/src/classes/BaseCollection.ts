import utilities from '@/utilities';
import IBaseCollection from '@/interfaces/IBaseCollection';
import Base from '@/classes/Base';
import IModel from '@/interfaces/IModel';
import {IFieldValue} from '@/interfaces/Components';

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

  /**
   * This can be a T, number, T[], or a mixed array of T and number
   * @param args
   */
  remove(args: any): void {
    // Nothing to do, bail early
    if (utilities.isEmpty(args)) {
      return;
    }
    if (!utilities.isArray(args)) {
      args = [args];
    }
    args.forEach((item: any) => {
      const index = utilities.isNumber(item) ? item : this.indexOf(item);
      if (index !== -1) {
        this.splice(index, 1);
      }
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

  findRecord(field: string, value: IFieldValue): IModel | undefined {
    for (let i = 0; i < this.count(); i++) {
      const record = this[i];
      if (record.get(field) === value) {
        return record;
      }
    }
  }

  collect(field: string): IFieldValue[] {
    const data: IFieldValue[] = [];
    this.forEach((record) => {
      data.push(record.get(field));
    });
    return data;
  }
}

export default BaseCollection;
