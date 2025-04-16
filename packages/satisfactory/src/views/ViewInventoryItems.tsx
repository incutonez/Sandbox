import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
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

export function ViewInventoryItems() {
	let itemDialogNode;
	const dispatch = useDispatch();
	const [columns] = useState([columnHelper.accessor("name", {
		header: "Name",
		cell: (info) => <CellItemName cell={info.cell} />,
	}), columnHelper.accessor("producingTotal", {
		header: "Producing",
		meta: {
			cellCls: "text-right",
			onClickCell(cell) {
				dispatch(setActiveItem(cell.row.original));
				setIsItemProduction(true);
				setShowItemDialog(true);
			},
		},
		cell: (info) => info.getValue(),
	}), columnHelper.accessor("consumingTotal", {
		header: "Consuming",
		meta: {
			cellCls: "text-right",
			onClickCell(cell) {
				dispatch(setActiveItem(cell.row.original));
				setIsItemProduction(false);
				setShowItemDialog(true);
			},
		},
		cell: (info) => info.getValue(),
	}), columnHelper.accessor("total", {
		header: "Total",
		meta: {
			cellCls: "text-right",
		},
		cell: (info) => info.getValue(),
	})]);
	const [search, setSearch] = useState<string>();
	const [isItemProduction, setIsItemProduction] = useState(false);
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
		columns,
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
				isProduction={isItemProduction}
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
	function onClickSave(updateRecord: IInventoryItem) {
		// This gets the previous state of our record
		const found = data.find((item) => item.id === updateRecord.id)!;
		const previousItems = isItemProduction ? found.producedBy : found.consumedBy;
		const updatedItems = isItemProduction ? updateRecord.producedBy : updateRecord.consumedBy;
		previousItems.forEach((item) => {
			const { id } = item;
			if (!updatedItems.find((recipe) => recipe.id === id)) {
				dispatch(deleteRecipe(item));
			}
		});
		for (const item of updatedItems) {
			const { id } = item;
			const foundPreviousItem = previousItems.find((previousItem) => previousItem.id === id);
			// No changes, skip
			if (foundPreviousItem === item) {
				continue;
			}
			// Already exists but has changes
			else if (foundPreviousItem) {
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
			/>
			{itemDialogNode}
		</article>
	);
}
