const Prefix = 'mdc-data-table';
const Cell = '-cell';
const Row = '-row';
const Numeric = '--numeric';
const Container = '-container';
const Table = `${Prefix}__table`;
const TableCell = `${Prefix}__cell`;
const TableHeader = `${Prefix}__header`;
const TableColumn = `${TableHeader}${Cell}`;

export const MDClasses = {
  TABLE: Table,
  TABLE_FIXED_HEADER: `${Prefix}--sticky-header`,
  TABLE_CONTAINER: `${Table}${Container}`,
  TABLE_CONTENT: `${Prefix}__content`,
  TABLE_COLUMN_CONTAINER: `${TableHeader}${Row}`,
  TABLE_COLUMN: TableColumn,
  TABLE_COLUMN_NUMERIC: `${TableColumn}${Numeric}`,
  TABLE_CELL: TableCell
};
