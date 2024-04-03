import { ApiPaginatedRequest } from "@incutonez/spec/dist";
import { ColumnPassThroughMethodOptions, ColumnPassThroughOptions, ColumnProps } from "primevue/column";
import { EmitFn, IBaseButton } from "@/types/components";

export type TColumnLock = "left" | "right" | false;

export interface IPassThroughOptions extends ColumnPassThroughMethodOptions {}

export interface ITableColumn<T = unknown> {
	field?: string;
	title?: string;
	titleCls?: string;
	titleAlign?: "left" | "center" | "right";
	id?: string;
	key?: string;
	sortable?: boolean;
	cellComponent?: InstanceType<any>;
	cellParams?: any;
	cellDisplay?: (data: T, records: T[]) => any;
	cellClass?: string | ((column: ITableColumn, node: T | ITreeNode<T>) => string);
	lock?: TColumnLock;
	cls?: string;
	showMenu?: boolean;
	state?: IColumnState;
	indexOriginal?: number;
	props?: ColumnProps;
	stateful?: boolean;
	expandable?: boolean;
	rowspan?: number;
	colspan?: number;
	classes?: ColumnPassThroughOptions;
}

export interface ITableGrid<TData = any> {
	records?: TData;
	title?: string;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	showRowsPerPage?: boolean;
	showSearch?: boolean;
	showAddEntity?: boolean;
	hideHeaders?: boolean;
	multiSelect?: boolean | undefined;
	columns?: ITableColumn<TData>[];
	columnsResize?: boolean;
	columnsReorder?: boolean;
	rowsPerPage?: number;
	load?: (params: ApiPaginatedRequest) => Promise<any>;
	remote?: boolean;
	/**
	 * Sometimes the API endpoint can only have a certain max number, which is what this represents.
	 * If it's not set, then the default is the rows per page value.
	 */
	remoteMax?: number;
	addEntityConfig?: IBaseButton;
}

export type ITableEmit = {
	load: [];
}

export interface IColumnState {
	lock?: TColumnLock;
	width?: number;
	index?: number;
}

export interface IColumnFilter {
	value: any;
	matchMode: string;
}

export type TColumnFilters = Record<string, IColumnFilter>;

export type TTableEmit = EmitFn<ITableEmit>;

export interface ITreeNode<T = any> {
	data: T;
	key: string;
	leaf?: boolean;
	root?: boolean;
	children?: ITreeNode[];
}
