import Sorter from '@/classes/Sorter';
import {FlexDirections, FlexJustifications, TextAlignments} from '@/statics/Flex';

export default interface IColumn {
  cls: Array<string>;
  text: string;
  type: number;
  field: string;
  isParent: boolean;
  isAssociation: boolean;
  sortable: boolean;
  isSorted: boolean;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  formatter: string | ((value: any, record: any) => {});
  flex: number;
  shrink: number;
  basis: string | number;
  width: number | string;
  hidden: boolean;
  border: string | boolean;
  cellBorder: string | boolean;
  columns?: IColumn[];
  sorter?: Sorter;
  direction?: FlexDirections;
  align?: TextAlignments;
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
