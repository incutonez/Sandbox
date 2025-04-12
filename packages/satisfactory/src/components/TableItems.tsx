import { useEffect, useState } from "react";
import {
	Cell,
	createColumnHelper,
	flexRender,
	getCoreRowModel, getSortedRowModel, Header, SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { loadInventory } from "@/api/inventory.ts";
import { FieldText } from "@/components/FieldText.tsx";
import { IInventoryItem } from "@/types.ts";

const columnHelper = createColumnHelper<IInventoryItem>();
const DefaultCellCls = "border-r border-b first:border-l px-2 py-1";
const DefaultColumns = [columnHelper.accessor("name", {
	header: "Name",
	cell: (info) => info.getValue(),
}), columnHelper.accessor("producingTotal", {
	header: "Producing",
	meta: {
		cellCls: "text-right",
	},
	cell: (info) => info.getValue(),
}), columnHelper.accessor("consumingTotal", {
	header: "Consuming",
	meta: {
		cellCls: "text-right",
	},
	cell: (info) => info.getValue(),
}), columnHelper.accessor("total", {
	header: "Total",
	meta: {
		cellCls: "text-right",
	},
	cell: (info) => info.getValue(),
})];

export function TableItems() {
	const [columns, setColumns] = useState(DefaultColumns);
	const [data, setData] = useState<IInventoryItem[]>([]);
	const [search, setSearch] = useState("");
	const [sorting, setSorting] = useState<SortingState>([{
		id: "name",
		desc: false,
	}]);
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});
	// TODOJEF: ADD SORT ICON
	const tableHeaders = table.getHeaderGroups().map((headerGroup) => {
		const rows = headerGroup.headers.map((header) => {
			return (
				<th
					key={header.id}
					className={getHeaderClass(header)}
					onClick={header.column.getToggleSortingHandler()}
					title={
						header.column.getCanSort()
							? header.column.getNextSortingOrder() === "asc"
								? "Sort ascending"
								: header.column.getNextSortingOrder() === "desc"
									? "Sort descending"
									: "Clear sort"
							: undefined
					}
				>
					{flexRender(header.column.columnDef.header, header.getContext())}
				</th>
			);
		});
		return (
			<tr key={headerGroup.id}>
				{rows}
			</tr>
		);
	});

	function onBlurSearch(searchValue: string) {
		if (searchValue) {
			const searchRegex = new RegExp(searchValue, "i");
			setColumns(DefaultColumns.filter(({ header }) => header === "" || searchRegex.test(header as string)));
		}
		else {
			setColumns(DefaultColumns.slice());
		}
	}

	function getHeaderClass(header: Header<IInventoryItem, unknown>) {
		const cls = ["z-1 min-w-64 p-2 bg-gray-400 border-r first:border-l border-y sticky top-0"];
		if (header.column.getCanSort()) {
			cls.push("cursor-pointer select-none");
		}
		return cls.join(" ");
	}

	function getCellClass(cell: Cell<IInventoryItem, unknown>) {
		const cls = [DefaultCellCls];
		if (cell.column.id === "total") {
			if (cell.getValue<number>() < 0) {
				cls.push("bg-red-200");
			}
			else if (cell.getValue<number>() > 0) {
				cls.push("bg-green-200");
			}
			else {
				cls.push("bg-white");
			}
		}
		else {
			cls.push("bg-white");
		}
		if (cell.column.columnDef.meta?.cellCls) {
			cls.push(cell.column.columnDef.meta?.cellCls);
		}
		return cls.join(" ");
	}

	useEffect(() => {
		setData(loadInventory());
	}, []);

	return (
		<article className="size-full flex flex-col">
			<section>
				<FieldText
					value={search}
					setter={setSearch}
					label="Search"
					onInputChange={onBlurSearch}
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
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</article>
	);
}
