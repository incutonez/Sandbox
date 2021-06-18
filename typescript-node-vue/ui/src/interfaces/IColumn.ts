import Sorter from '@/classes/Sorter';
import {FlexDirections, FlexJustifications, TextAlignments} from '@/statics/Flex';

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
  sortable: boolean;
  isSorted: boolean;
  sorter?: Sorter;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  formatter: string | ((value: any, record: any) => {});
  flex: number;
  shrink: number;
  basis: string | number;
  cellCls: string;
  width: number | string;
  direction?: FlexDirections;
  align?: TextAlignments;
  hidden: boolean;
  border: string | boolean;
  cellBorder: string | boolean;
  cellAlign?: FlexJustifications;

  isAction(): boolean;

  canSort(): boolean;

  isNested(): boolean;

  isVerticalLayout(): boolean;

  isCellVerticalLayout(): boolean;

  getCellDirection(): FlexDirections;

  getTextAlignment(): string;

  getCellPack(): string;

  getCellAlignment(): string;
}
