import { ColumnProps } from "primevue/column";

export interface IGridColumn {
	field?: string;
	title?: string;
	id?: string;
	key?: string;
	sortable?: boolean;
}

export interface IGridTable<TData = any> {
	records?: TData;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	multiSelect?: boolean | undefined;
	columns?: IGridColumn[];
	columnsResize?: boolean;
	columnsReorder?: boolean;
}

export function getColumnProps({ field, title, sortable }: IGridColumn) {
	const columnProps: ColumnProps = {
		field,
		header: title,
		sortable: sortable ?? true,
	};
	return columnProps;
}

export function getColumnKey({ field, id, key }: IGridColumn, index: number) {
	return field || id || key || `col_${index}`;
}
