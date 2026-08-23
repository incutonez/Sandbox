import type {
	Cell as ITanStackCell,
	CellContext as ITanStackCellContext,
	ColumnDef as ITanStackColumn,
	ColumnDefBase,
	ColumnDefTemplate,
	Header as ITanStackHeader,
	Row as ITanStackRow,
	RowData,
	SortingState as ITanStackSort,
	Table as ITanStackTable,
	TableFeatures,
} from "@tanstack/vue-table";

export type ISortIdentity = -1 | 1;

export interface ITable<TData extends RowData> extends ITanStackTable<TableFeatures, TData> {
	getColumnSortIdentity: (columnId: string) => ISortIdentity;
	getSortedRowIndex: (columnId: string) => number;
}

export type ITableRow<TData extends RowData> = ITanStackRow<TableFeatures, TData>;

export type ITableCell<TData extends RowData, TValue = unknown> = ITanStackCell<TableFeatures, TData, TValue>;

export interface ITableCellContext<TData extends RowData, TValue = unknown> extends Omit<ITanStackCellContext<TableFeatures, TData, TValue>, "table"> {
	table: ITable<TData>;
}

export type ITableHeader<TData extends RowData, TValue = unknown> = ITanStackHeader<TableFeatures, TData, TValue>;

/* We have to first omit all "cell" properties from each union type... because under the hood, ITanStackColumn unions
 * A LOT of types AND interfaces, so it gets quite hairy.  Exclude didn't work here because it lost the type of cell
 * when we added our own
 * Idea from https://stackoverflow.com/a/62928916/1253609 */
export type ITableColumnOmit<TData extends RowData, T = ITanStackColumn<TableFeatures, TData>> = T extends ColumnDefBase<TableFeatures, TData> ? Omit<T, "cell" | "columns"> : never;

export type ITableColumn<TData extends RowData> = ITableColumnOmit<TData> & {
	cell?: ColumnDefTemplate<ITableCellContext<TData>>;
	columns?: ITableColumn<TData>[];
};

export type ITableSort = ITanStackSort;

export interface ITableData<TData extends RowData> {
	table: ITable<TData>;
	tableLayout?: "table-auto" | "table-fixed";
	tableClasses?: string;
	rowCls?: string | ((row: ITableRow<TData>) => string);
	hideHeaders?: boolean;
	showSummary?: boolean;
	isSubRow?: boolean;
}
