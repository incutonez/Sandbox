import { reactive } from "vue";
import { ColumnPassThroughOptions, ColumnProps } from "primevue/column";

export type TColumnLock = "left" | "right" | false;

export interface IGridColumn {
	field?: string;
	title?: string;
	id?: string;
	key?: string;
	sortable?: boolean;
	cellComponent?: InstanceType<any>;
	cellParams?: any;
	lock?: TColumnLock;
	cls?: string;
	showMenu?: boolean;
	state?: IColumnState;
	indexOriginal?: number;
	props?: ColumnProps;
	stateful?: boolean;
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

export interface IColumnState {
	lock?: TColumnLock;
	width?: number;
	index?: number;
}

export function getColumnProps({ field, title, sortable, lock, cls = "", showMenu = true }: IGridColumn) {
	const pt: ColumnPassThroughOptions = {};
	if (showMenu) {
		pt.headerContent = {
			class: ["pr-10"],
		};
	}
	if (lock === false) {
		lock = undefined;
	}
	const columnProps: ColumnProps = {
		field,
		pt,
		header: title,
		sortable: sortable ?? true,
		frozen: !!lock,
		alignFrozen: lock,
		class: cls,
	};
	return reactive(columnProps);
}

export function setColumnLock(lock: TColumnLock, column: IGridColumn) {
	column.lock = lock;
	if (column.props) {
		column.props.frozen = !!column.lock;
		column.props.alignFrozen = column.lock === false ? undefined : column.lock;
	}
}
