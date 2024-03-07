import { reactive } from "vue";
import { ApiPaginatedRequest } from "@incutonez/api-spec/dist";
import { ColumnProps } from "primevue/column";
import { IBaseButton, IOption } from "@/types/components";

export type TColumnLock = "left" | "right" | false;

export interface IGridColumn {
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
}

export interface IGridTable<TData = any> {
	records?: TData;
	title?: string;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	showRowsPerPage?: boolean;
	multiSelect?: boolean | undefined;
	columns?: IGridColumn[];
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

export interface IColumnState {
	lock?: TColumnLock;
	width?: number;
	index?: number;
}

export const RowsPerPageOptions: IOption[] = [
	{
		id: 10,
		name: "10",
	},
	{
		id: 20,
		name: "20",
	},
	{
		id: 50,
		name: "50",
	},
	{
		id: 100,
		name: "100",
	},
];

export function getColumnProps({ field, title, titleCls, titleAlign, sortable, lock, cls = "", showMenu = true, id }: IGridColumn) {
	const headerContentCls = [];
	if (showMenu) {
		headerContentCls.push("pr-10");
	}
	if (titleAlign === "center") {
		headerContentCls.push("justify-center");
	}
	else if (titleAlign === "right") {
		headerContentCls.push("justify-end");
	}
	if (lock === false) {
		lock = undefined;
	}
	const columnProps: ColumnProps = {
		field,
		pt: {
			headerContent: {
				class: headerContentCls,
			},
		},
		header: title,
		headerClass: titleCls,
		sortable: sortable ?? true,
		frozen: !!lock,
		alignFrozen: lock,
		class: cls,
		columnKey: id,
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
