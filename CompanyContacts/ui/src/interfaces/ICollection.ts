import Sorter from "ui/classes/Sorter";
import BaseCollection from "ui/classes/BaseCollection";

export interface ICollection<T> extends BaseCollection<T> {
  sorters: BaseCollection<Sorter>;

  doSort(sorters: BaseCollection<Sorter>): void;

  addSorter(sorter: Sorter | Sorter[], clear?: boolean): void;
}
