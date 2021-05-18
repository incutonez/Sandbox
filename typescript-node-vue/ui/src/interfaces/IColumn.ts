import ISorter from '@/interfaces/ISorter';

export default interface IColumn {
  cls: Array<string>;
  text: string;
  type: number;
  field: string;
  rowSpan: number;
  colSpan: number;
  columns?: IColumn[];
  isParent: boolean;
  isAssociation: boolean;
  isSortable: boolean;
  sorter?: ISorter;
}
