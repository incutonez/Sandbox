import { IGridColumn } from "@/types/dataTable";

export function useColumnIndex(): IGridColumn {
	return {
		lock: "left",
		showMenu: false,
		cellDisplay(data: any, records: any) {
			return records.indexOf(data) + 1;
		},
	};
}
