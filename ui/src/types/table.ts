import { ApiPaginatedRequest } from "@incutonez/spec/dist";
import { ColumnProps } from "primevue/column";
import { EmitFn, IBaseButton } from "@/types/components";

export type TColumnLock = "left" | "right" | false;

export interface ITableColumn {
	field?: string;
	title?: string;
	titleCls?: string;
	titleAlign?: "left" | "center" | "right";
	id?: string;
	key?: string;
	sortable?: boolean;
	cellComponent?: InstanceType<any>;
	cellParams?: any;
	cellDisplay?: (data: unknown, records: unknown) => any;
	lock?: TColumnLock;
	cls?: string;
	showMenu?: boolean;
	state?: IColumnState;
	indexOriginal?: number;
	props?: ColumnProps;
	stateful?: boolean;
	expandable?: boolean;
}

export interface ITableGrid<TData = any> {
	records?: TData;
	title?: string;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	showRowsPerPage?: boolean;
	multiSelect?: boolean | undefined;
	columns?: ITableColumn[];
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

export type TTableEmit = EmitFn<ITableEmit>;
