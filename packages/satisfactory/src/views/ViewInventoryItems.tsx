import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	Cell,
	createColumnHelper,
	getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	addRecipe,
	deleteRecipe,
	loadInventory,
	saveInventory,
	setActiveItem, updateRecipe,
	useAppSelector,
} from "@/api/inventory.ts";
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
	const [search, setSearch] = useState<string>();
	const [globalFilter, setGlobalFilter] = useState<string>();
	const [showItemDialog, setShowItemDialog] = useState(false);
	const data = useAppSelector((state) => state.inventory);
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

	// TODOJEF: Add consuming and total views
	// TODOJEF: Need to swap between producing and consuming here... show a different dialog or figure out how to combine?
	function onClickCell(cell: Cell<IInventoryItem, unknown>) {
		if (cell.column.columnDef.meta?.canClick) {
			dispatch(setActiveItem(cell.row.original));
			setShowItemDialog(true);
		}
	}

	function onClickSave(recipeUpdates: IInventoryItem) {
		const found = data.find((item) => item.id === recipeUpdates.id)!;
		found.producedBy.forEach((item) => {
			if (!recipeUpdates.producedBy.find((recipe) => recipe.id === item.id)) {
				dispatch(deleteRecipe(item));
			}
		});
		for (const item of recipeUpdates.producedBy) {
			const foundProduced = found.producedBy.find((producedItem) => producedItem.id === item.id);
			// No changes, skip
			if (foundProduced === item) {
				continue;
			}
			// Already exists but has changes
			else if (foundProduced) {
				dispatch(updateRecipe(item));
			}
			// Not found, new record
			else {
				dispatch(addRecipe(item));
			}
		}
		dispatch(saveInventory(false));
		reloadInventory();
		setShowItemDialog(false);
	}

	function onClickClearData() {
		dispatch(saveInventory(true));
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
