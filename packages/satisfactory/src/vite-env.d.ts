/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta<TData extends RowData, TValue> {
		cellCls: string
	}
}
