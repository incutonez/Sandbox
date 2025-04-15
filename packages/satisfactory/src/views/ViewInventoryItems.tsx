import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Cell,
	createColumnHelper,
	getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { loadInventory, saveInventory, setActiveItem, store, useAppSelector } from "@/api/inventory.ts";
import { BaseButton } from "@/components/BaseButton.tsx";
import { CellItemName } from "@/components/CellItem.tsx";
import { FieldText } from "@/components/FieldText.tsx";
import { IconDelete } from "@/components/Icons.tsx";
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
	let itemDialogNode;
	const dispatch = useDispatch();
	const [data, setData] = useState<IInventoryItem[]>([]);
	const [search, setSearch] = useState<string>();
	const [globalFilter, setGlobalFilter] = useState<string>();
	const [showItemDialog, setShowItemDialog] = useState(false);
	const activeCell = useAppSelector((state) => state.activeItem);
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
	const reloadInventory = useCallback(() => {
		dispatch(loadInventory());
		setData(store.getState().inventory);
	}, [dispatch]);

	if (showItemDialog && activeCell) {
		itemDialogNode = (
			<ViewInventoryItem
				show={showItemDialog}
				setShow={setShowItemDialog}
				onClickSave={onClickSave}
			/>
		);
	}

	function onChangeSearch(searchValue: string) {
		table.setGlobalFilter(searchValue);
	}

	// TODOJEF: Need to swap between producing and consuming here... show a different dialog or figure out how to combine?
	function onClickCell(cell: Cell<IInventoryItem, unknown>) {
		if (cell.column.columnDef.meta?.canClick) {
			dispatch(setActiveItem(cell.row.original));
			setShowItemDialog(true);
		}
	}

	// TODOJEF: NEED TO FIX THIS... figure out how to handle the updates, deletes, and creates
	function onClickSave(recipeUpdates: IInventoryItem) {
		// const diff = getDiff(previousCell ?? {}, recipeUpdates);
		// diff.forEach((item) => {
		// 	if (item.op === "add") {
		// 		recipeUpdates.forEach((recipe) => {
		// 			recipe.recipe.produces.forEach((produce) => {
		// 				const found = data.find((item) => item.id === produce.item);
		// 				if (found) {
		// 					found.producedBy.push(recipe);
		// 				}
		// 			});
		// 			recipe.recipe.consumes.forEach((produce) => {
		// 				const found = data.find((item) => item.id === produce.item);
		// 				if (found) {
		// 					found.consumedBy.push(recipe);
		// 				}
		// 			});
		// 		});
		// 	}
		// });
		// dispatch(saveInventory(data));
		// reloadInventory();
		setShowItemDialog(false);
	}

	function onClickClearData() {
		dispatch(saveInventory());
		reloadInventory();
	}

	useEffect(() => {
		reloadInventory();
	}, [reloadInventory]);

	return (
		<article className="size-full flex flex-col space-y-2">
			<section className="ml-auto flex space-x-2">
				<FieldText
					value={search}
					setter={setSearch}
					label="Search"
					placeholder="Search..."
					onInputChange={onChangeSearch}
				/>
				<BaseButton
					text="Delete"
					icon={IconDelete}
					onClick={onClickClearData}
				/>
			</section>
			<TableData<IInventoryItem>
				table={table}
				onClickCell={onClickCell}
			/>
			{itemDialogNode}
		</article>
	);
}
