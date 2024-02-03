import { ColumnProps } from "primevue/column";

export interface IGridColumn {
	field?: string;
	title?: string;
	id?: string;
	key?: string;
	sortable?: boolean;
	cellComponent?: InstanceType<any>;
	cellParams?: any;
	lock?: "left" | "right";
	cls?: string;
	showMenu?: boolean;
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
	/**
	 * Sometimes the API endpoint can only have a certain max number, which is what this represents.
	 * If it's not set, then the default is the rows per page value.
	 */
	remoteMax?: number;
}

export function getColumnProps({ field, title, sortable, lock, cls }: IGridColumn) {
	const columnProps: ColumnProps = {
		field,
		header: title,
		sortable: sortable ?? true,
		frozen: !!lock,
		alignFrozen: lock,
		class: cls,
	};
	return columnProps;
}

export function getColumnKey({ field, id, key }: IGridColumn, index: number) {
	return field || id || key || `col_${index}`;
}
