import { ReactNode, useEffect, useState } from "react";
import {
	Cell,
	createColumnHelper,
	flexRender,
	getCoreRowModel, getFilteredRowModel, getSortedRowModel, Header, SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { loadInventory } from "@/api/inventory.ts";
import { CellItemName } from "@/components/CellItemName.tsx";
import { FieldText } from "@/components/FieldText.tsx";
import { IconSort } from "@/components/Icons.tsx";
import { ViewItem } from "@/components/ViewItem.tsx";
import { IInventoryItem } from "@/types.ts";

const columnHelper = createColumnHelper<IInventoryItem>();
const DefaultCellCls = "border-r border-b first:border-l px-2 py-1";
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

export function TableItems() {
	const [columns] = useState(DefaultColumns);
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
		columns,
		data,
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
	const tableHeaders = table.getHeaderGroups().map((headerGroup) => {
		const rows = headerGroup.headers.map((header) => {
			const { column } = header;
			let title = "";
			let sortIcon: ReactNode;
			if (column.getCanSort()) {
				const sortDir = column.getIsSorted();
				switch (column.getNextSortingOrder()) {
					case "asc":
						title = "Sort Ascending";
						break;
					case "desc":
						title = "Sort Descending";
						break;
					default:
						title = "Clear Sort";
				}
				if (sortDir) {
					const sortCls = ["size-6"];
					if (sortDir === "asc") {
						sortCls.push("rotate-180 -scale-x-90");
					}
					sortIcon = (
						<div className="absolute right-2 top-2">
							<IconSort className={sortCls.join(" ")} />
						</div>
					);
				}
			}
			return (
				<th
					key={header.id}
					className={getHeaderClass(header)}
					onClick={column.getToggleSortingHandler()}
					title={title}
				>
					<span>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</span>
					{sortIcon}
				</th>
			);
		});
		return (
			<tr key={headerGroup.id}>
				{rows}
			</tr>
		);
	});

	function onChangeSearch(searchValue: string) {
		table.setGlobalFilter(searchValue);
	}

	function getHeaderClass(header: Header<IInventoryItem, unknown>) {
		const cls = ["z-1 min-w-64 p-2 border-r first:border-l border-y sticky top-0"];
		if (header.column.getCanSort()) {
			cls.push("cursor-pointer select-none hover:bg-blue-300");
		}
		if (header.column.getIsSorted()) {
			cls.push("bg-blue-400");
		}
		else {
			cls.push("bg-gray-300");
		}
		return cls.join(" ");
	}

	function onClickCell(cell: Cell<IInventoryItem, unknown>) {
		if (cell.column.columnDef.meta?.canClick) {
			setActiveCell(cell.row.original);
			setShowItemDialog(true);
		}
	}

	function getCellClass(cell: Cell<IInventoryItem, unknown>) {
		const cls = [DefaultCellCls];
		const { column } = cell;
		const { meta } = column.columnDef;
		if (column.id === "total") {
			const value = cell.getValue<number>();
			if (value < 0) {
				cls.push("bg-red-200");
			}
			else if (value > 0) {
				cls.push("bg-green-200");
			}
			else {
				cls.push("bg-white");
			}
		}
		else {
			cls.push("bg-white");
		}
		if (meta) {
			if (meta.cellCls) {
				cls.push(meta.cellCls);
			}
			if (meta.canClick) {
				cls.push("cursor-pointer hover:bg-blue-200");
			}
		}
		return cls.join(" ");
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
			<section className="overflow-auto flex-1">
				<table className="border-spacing-0 border-separate w-full">
					<thead>
						{tableHeaders}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className={getCellClass(cell)}
										onClick={() => onClickCell(cell)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</section>
			<ViewItem
				record={activeCell}
				show={showItemDialog}
				setShow={setShowItemDialog}
			/>
		</article>
	);
}
