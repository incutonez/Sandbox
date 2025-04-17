﻿import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { deleteActiveItemRecipe, updateActiveItemRecipe, useAppSelector } from "@/api/inventory.ts";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.tsx";
import { TableData } from "@/components/TableData.tsx";
import { IInventoryItem, IInventoryRecipe, IRecipeItem, TRecipeType } from "@/types.ts";
import { ViewRecipe } from "@/views/ViewRecipe.tsx";

export interface IViewItem extends IBaseDialog {
	recipeType?: TRecipeType;
	onClickSave: (recipes: IInventoryItem) => void;
}

export function ViewInventoryItem({ show, setShow, onClickSave, recipeType }: IViewItem) {
	let viewRecipeNode;
	const dispatch = useDispatch();
	const record = useAppSelector((state) => state.activeItem);
	const records = useAppSelector((state) => state.activeItem?.recipes ?? []);
	const [data, setData] = useState<IInventoryRecipe[]>(records);
	const [columns, setColumns] = useState<ColumnDef<IInventoryRecipe>[]>([]);
	const [selectedRecipe, setSelectedRecipe] = useState<IInventoryRecipe>();
	const [showRecipe, setShowRecipe] = useState(false);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	// TODOJEF: Add ability to add different factories and change name
	// TODOJEF: Adding something that consumes and produces the item adds it twice... like Alternate: Distilled Silica
	useEffect(() => {
		records.sort((lhs, rhs) => lhs.recipe.name.localeCompare(rhs.recipe.name));
		if (recipeType) {
			setData(records.filter((record) => record.recipeType === recipeType));
		}
		else {
			setData(records);
		}
	}, [records, recipeType]);

	useEffect(() => {
		const recordId = record?.id;
		const columnDefs: ColumnDef<IInventoryRecipe>[] = [{
			id: "actions",
			meta: {
				cellCls: "flex justify-center space-x-2",
				columnWidth: "min-w-auto",
			},
			cell(info) {
				return (
					<>
						<BaseButton
							icon={IconDelete}
							title="Delete Recipe"
							onClick={() => dispatch(deleteActiveItemRecipe({
								recipeType,
								record: info.row.original,
							}))}
						/>
						<BaseButton
							icon={IconEdit}
							title="Edit Recipe"
							onClick={() => onClickEditRecipe(info.row.original)}
						/>
					</>
				);
			},
		}, {
			header: "Recipe",
			accessorKey: "recipe.name",
			cell: (info) => info.getValue(),
		}, {
			header: "Overclock",
			accessorKey: "overclockValue",
			cell: (info) => `${info.getValue()}%`,
			meta: {
				cellCls: "text-center",
				columnWidth: "min-w-auto",
			},
		}, {
			header: "Somersloop",
			accessorKey: "somersloopValue",
			cell: (info) => info.getValue(),
			meta: {
				cellCls: "text-center",
				columnWidth: "min-w-auto",
			},
		}, {
			header: "Machine Count",
			accessorKey: "machineCount",
			cell: (info) => info.getValue(),
			meta: {
				cellCls: "text-center",
				columnWidth: "min-w-auto",
			},
		}];
		if (recipeType === "produces" || !recipeType) {
			columnDefs.push({
				header: "Produces",
				accessorKey: "recipe.produces",
				meta: {
					cellCls: "text-center",
					columnWidth: "min-w-auto",
				},
				cell(info) {
					const value = info.getValue<IRecipeItem[]>();
					const found = value.find((item) => item.item === recordId);
					if (!found) {
						return "-";
					}
					return (
						<span>
							{found.amountPerMinuteDisplay}
						</span>
					);
				},
				footer: () => record?.producingTotal || "-",
			});
		}
		if (recipeType === "consumes" || !recipeType) {
			columnDefs.push({
				header: "Consumes",
				accessorKey: "recipe.consumes",
				meta: {
					cellCls: "text-center",
					columnWidth: "min-w-auto",
				},
				cell(info) {
					const value = info.getValue<IRecipeItem[]>();
					const found = value.find((item) => item.item === recordId);
					if (!found) {
						return "-";
					}
					return (
						<span>
							{found.amountPerMinuteDisplay}
						</span>
					);
				},
				footer: () => record?.consumingTotal || "-",
			});
		}
		if (!recipeType) {
			columnDefs.push({
				header: "Remaining",
				meta: {
					cellCls: "text-center",
					columnWidth: "min-w-auto",
				},
				footer() {
					if (!record) {
						return "-";
					}
					return record.producingTotal - record.consumingTotal;
				},
			});
		}
		setColumns(columnDefs);
	}, [recipeType, setColumns, record, dispatch]);

	if (!record) {
		return;
	}
	let title = "Total";
	if (recipeType === "produces") {
		title = "Production";
	}
	else if (recipeType === "consumes") {
		title = "Consumption";
	}
	title = `${title}: ${record.name}`;
	const footerButtons = (
		<BaseButton
			text="Save"
			icon={IconSave}
			onClick={() => onClickSave(record)}
		/>
	);
	if (showRecipe) {
		viewRecipeNode = (
			<ViewRecipe
				record={selectedRecipe}
				recipeType={recipeType}
				highlightItem={record.id}
				show={showRecipe}
				setShow={setShowRecipe}
				onSave={onSaveRecipe}
			/>
		);
	}

	function onClickAddRecipe() {
		setSelectedRecipe(undefined);
		setShowRecipe(true);
	}

	function onClickEditRecipe(recipe: IInventoryRecipe) {
		setSelectedRecipe(recipe);
		setShowRecipe(true);
	}

	function onSaveRecipe(record: IInventoryRecipe) {
		dispatch(updateActiveItemRecipe({
			record,
			recipeType,
		}));
	}

	return (
		<>
			<BaseDialog
				title={title}
				show={show}
				setShow={setShow}
				footerSlot={footerButtons}
			>
				<article className="flex flex-col space-y-4">
					<section className="flex space-x-4 items-center">
						<BaseButton
							title="Add Recipe"
							text="Recipe"
							icon={IconAdd}
							onClick={onClickAddRecipe}
						/>
					</section>
					<TableData
						table={table}
						showSummary={true}
					/>
				</article>
			</BaseDialog>
			{viewRecipeNode}
		</>
	);
}
