import Sorter from '@/classes/Sorter';
import BaseCollection from '@/classes/BaseCollection';

export interface ICollection<T> extends BaseCollection<T> {
  sorters: BaseCollection<Sorter>;

  doSort(sorters: BaseCollection<Sorter>): void;

  addSorter(sorter: Sorter | Sorter[], clear: boolean): void;
}
