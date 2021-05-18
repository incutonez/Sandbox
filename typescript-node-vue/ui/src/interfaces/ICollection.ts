import IBaseCollection from '@/interfaces/IBaseCollection';
import BaseCollection from '@/classes/BaseCollection';
import Sorter from '@/classes/Sorter';

export default interface ICollection<T> extends IBaseCollection<T> {
  sorters: BaseCollection<Sorter>;

  doSort(sorters: BaseCollection<Sorter>): void;

  addSorter(sorter: Sorter | Sorter[], clear: boolean): void;
}
