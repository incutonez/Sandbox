import BaseCollection from '@/classes/BaseCollection';
import ICollection from '@/interfaces/ICollection';
import Sorter from '@/classes/Sorter';

interface Collection<T> extends ICollection<T> {
}

class Collection<T> extends BaseCollection<T> {
  sorters = new BaseCollection<Sorter>(Sorter);

  constructor(type: new (data: T) => T, args?: any) {
    super(type);
    this.add(args);
  }

  doSort(sorters: BaseCollection<Sorter>): void {
    console.log(this, sorters);
    this.sort((lhs: any, rhs: any) => {
      let result = 0;
      for (let i = 0; i < sorters.length; i++) {
        const sorter = sorters[i];
        const direction = sorter.direction === 'ASC' ? 1 : -1;
        const fields = sorter.field && sorter.field.split('.');
        if (fields) {
          let field = fields[0];
          let lhsValue = Reflect.get(lhs, field);
          let rhsValue = Reflect.get(rhs, field);
          for (let j = 1; j < fields.length; j++) {
            field = fields[j];
            lhsValue = lhsValue[field];
            rhsValue = rhsValue[field];
          }
          console.log(direction, lhsValue, rhsValue);
          if (lhsValue === rhsValue) {
            continue;
          }
          else if (lhsValue < rhsValue) {
            result = -1 * direction;
            break;
          }
          result = 1 * direction;
          break;
        }
      }
      return result;
    });
    this.emit('sort');
  }

  addSorter(sorter: Sorter | Sorter[], clear?: boolean): void {
    if (clear) {
      this.sorters.clear();
    }
    if (Array.isArray(sorter)) {
      this.sorters.add(sorter);
    }
    else {
      this.sorters.add(sorter);
    }
    this.doSort(this.sorters);
  }
}

export default Collection;
