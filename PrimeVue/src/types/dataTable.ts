export interface IBaseDataTable<TData = any> {
	records?: TData;
	showHoverRow?: boolean;
	showLinesColumn?: boolean;
	showLinesRow?: boolean;
	showStripedRows?: boolean;
	multiSelect?: boolean | undefined;
}
