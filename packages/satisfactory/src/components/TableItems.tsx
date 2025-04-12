import { CSSProperties, useEffect, useState } from "react";
import {
	Column,
	ColumnPinningState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import items from "@/api/inventory.json";
import { loadInventory } from "@/api/inventory.ts";
import { FieldText } from "@/components/FieldText.tsx";
import { IInventoryItem, ITableItem } from "@/types.ts";

const columnHelper = createColumnHelper<ITableItem>();

const DefaultColumns = (items as IInventoryItem[]).map((item) => {
	return columnHelper.accessor(item.id, {
		header: item.name,
		cell: (info) => info.getValue(),
	});
});

DefaultColumns.unshift(columnHelper.accessor("label", {
	header: "",
	cell: (info) => info.getValue(),
}));

function getCommonPinningStyles(column: Column<ITableItem>): CSSProperties {
	const isPinned = column.getIsPinned();
	return {
		left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
		right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
		position: isPinned ? "sticky" : "relative",
		width: column.getSize(),
		zIndex: isPinned ? 1 : 0,
	};
}

export function TableItems() {
	const [columns, setColumns] = useState(DefaultColumns);
	const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
		left: ["label"],
		right: [],
	});
	const [data, setData] = useState<ITableItem[]>([]);
	const [inventory, setInventory] = useState<IInventoryItem[]>([]);
	const [search, setSearch] = useState("");
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
		onColumnPinningChange: setColumnPinning,
		state: {
			columnPinning,
		},
	});
	const tableHeaders = table.getHeaderGroups().map((headerGroup) => {
		const rows = headerGroup.headers.map((header) => {
			return (
				<th
					key={header.id}
					className="min-w-64 p-2 bg-gray-400 border-r first:border-l border-y"
					style={getCommonPinningStyles(header.column)}
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

	useEffect(() => {
		setInventory(loadInventory());
	}, []);

	useEffect(() => {
		const dataProducing = {
			label: "Producing",
		} as ITableItem;
		const dataConsuming = {
			label: "Consuming",
		} as ITableItem;
		const dataTotal = {
			label: "Total",
		} as ITableItem;
		inventory.forEach(({ id, producing, consuming }) => {
			dataProducing[id] = producing.reduce((previous, current) => previous + current, 0);
			dataConsuming[id] = consuming.reduce((previous, current) => previous + current, 0);
			dataTotal[id] = dataProducing[id] - dataConsuming[id];
		});
		setData([dataProducing, dataConsuming, dataTotal]);
	}, [inventory]);

	return (
		<article className="w-full">
			<section>
				<FieldText
					value={search}
					setter={setSearch}
					label="Search"
					onInputChange={onBlurSearch}
				/>
			</section>
			<section className="overflow-auto">
				<table className="border-spacing-0 border-separate">
					<thead>
						{tableHeaders}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										style={getCommonPinningStyles(cell.column)}
										className="bg-white border-r border-b"
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
