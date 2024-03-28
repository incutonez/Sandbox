import { ITableColumn } from "@/types/table";

export function useColumnIndex(): ITableColumn {
	return {
		lock: "left",
		showMenu: false,
		cellDisplay(data: any, records: any) {
			return records.indexOf(data) + 1;
		},
	};
}
