import { ITableColumn } from "@/types/table";

export function useColumnIndex<T = unknown>(): ITableColumn<T> {
	return {
		lock: "left",
		showMenu: false,
		cellDisplay(data, records) {
			return records.indexOf(data) + 1;
		},
	};
}
