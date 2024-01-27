export interface IGridColumn {
	field?: string;
	title?: string;
}

export interface IGridTable<TData = any> {
	records?: TData;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	multiSelect?: boolean | undefined;
}
