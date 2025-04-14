import { useEffect, useState } from "react";
import {
	Cell,
	createColumnHelper,
	getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { loadInventory } from "@/api/inventory.ts";
import { CellItemName } from "@/components/CellItemName.tsx";
import { FieldText } from "@/components/FieldText.tsx";
import { TableData } from "@/components/TableData.tsx";
import { IInventoryItem } from "@/types.ts";
import { ViewInventoryItem } from "@/views/ViewInventoryItem.tsx";

const columnHelper = createColumnHelper<IInventoryItem>();
const DefaultColumns = [columnHelper.accessor("name", {
	header: "Name",
	cell: (info) => <CellItemName cell={info.cell} />,
}), columnHelper.accessor("producingTotal", {
	header: "Producing",
	meta: {
		cellCls: "text-right",
		canClick: true,
	},
	cell: (info) => info.getValue(),
}), columnHelper.accessor("consumingTotal", {
	header: "Consuming",
	meta: {
		cellCls: "text-right",
		canClick: true,
	},
	cell: (info) => info.getValue(),
}), columnHelper.accessor("total", {
	header: "Total",
	meta: {
		cellCls: "text-right",
		canClick: true,
	},
	cell: (info) => info.getValue(),
})];

export function ViewInventoryItems() {
	const [data, setData] = useState<IInventoryItem[]>([]);
	const [search, setSearch] = useState("");
	const [globalFilter, setGlobalFilter] = useState<string>();
	const [showItemDialog, setShowItemDialog] = useState(false);
	const [activeCell, setActiveCell] = useState<IInventoryItem>();
	const [sorting, setSorting] = useState<SortingState>([{
		id: "name",
		desc: false,
	}]);
	const table = useReactTable({
		data,
		columns: DefaultColumns,
		globalFilterFn: "includesString",
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		state: {
			sorting,
			globalFilter,
		},
	});

	function onChangeSearch(searchValue: string) {
		table.setGlobalFilter(searchValue);
	}

	function onClickCell(cell: Cell<IInventoryItem, unknown>) {
		if (cell.column.columnDef.meta?.canClick) {
			setActiveCell(cell.row.original);
			setShowItemDialog(true);
		}
	}

	useEffect(() => {
		setData(loadInventory());
	}, []);

	return (
		<article className="size-full flex flex-col space-y-2">
			<section className="ml-auto">
				<FieldText
					value={search}
					setter={setSearch}
					label="Search"
					placeholder="Search..."
					onInputChange={onChangeSearch}
				/>
			</section>
			<TableData<IInventoryItem>
				table={table}
				onClickCell={onClickCell}
			/>
			<ViewInventoryItem
				record={activeCell}
				show={showItemDialog}
				setShow={setShowItemDialog}
			/>
		</article>
	);
}
