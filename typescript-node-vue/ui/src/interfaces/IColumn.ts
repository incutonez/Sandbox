import Sorter from '@/classes/Sorter';

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
  isSorted: boolean;
  sorter?: Sorter;
  formatter: string | ((value: any, record: any) => {});
  flex: number;
}
