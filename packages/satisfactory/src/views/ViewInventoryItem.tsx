import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { deleteActiveItemRecipe, updateActiveItemRecipe, useAppSelector } from "@/api/inventory.ts";
import { recipes } from "@/api/recipes.ts";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.tsx";
import { TableData } from "@/components/TableData.tsx";
import { IInventoryItem, IInventoryRecipe, IRecipe, IRecipeItem } from "@/types.ts";
import { ViewRecipe } from "@/views/ViewRecipe.tsx";

export interface IViewItem extends IBaseDialog {
	isProduction: boolean;
	onClickSave: (recipes: IInventoryItem) => void;
}

export function ViewInventoryItem({ show, setShow, onClickSave, isProduction }: IViewItem) {
	let viewRecipeNode;
	const dispatch = useDispatch();
	const record = useAppSelector((state) => state.activeItem);
	const data = useAppSelector((state) => isProduction ? state.activeItem?.producedBy : state.activeItem?.consumedBy) ?? [];
	const [selectedRecipe, setSelectedRecipe] = useState<IInventoryRecipe>();
	const [availableRecipes, setAvailableRecipes] = useState<IRecipe[]>(recipes);
	const [showRecipe, setShowRecipe] = useState(false);
	let totalColumn: ColumnDef<IInventoryRecipe>;
	if (isProduction) {
		totalColumn = {
			header: "Produces",
			accessorKey: "recipe.produces",
			meta: {
				cellCls: "text-center",
				columnWidth: "min-w-auto",
			},
			cell(info) {
				const value = info.getValue<IRecipeItem[]>();
				const found = value.find((item) => item.item === record?.id);
				if (!found) {
					return 0;
				}
				return (
					<span>
						{found.amountPerMinuteDisplay}
					</span>
				);
			},
			footer: () => record?.producingTotal,
		};
	}
	else {
		totalColumn = {
			header: "Consumes",
			accessorKey: "recipe.consumes",
			meta: {
				cellCls: "text-center",
				columnWidth: "min-w-auto",
			},
			cell(info) {
				const value = info.getValue<IRecipeItem[]>();
				const found = value.find((item) => item.item === record?.id);
				if (!found) {
					return 0;
				}
				return (
					<span>
						{found.amountPerMinuteDisplay}
					</span>
				);
			},
			footer: () => record?.consumingTotal,
		};
	}
	const table = useReactTable({
		data,
		columns: [{
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
								isProduction,
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
		},
		totalColumn],
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		if (record) {
			const recordId = record.id;
			setAvailableRecipes(recipes.filter((recipe) => {
				const items = isProduction ? recipe.produces : recipe.consumes;
				return items.find((produce) => produce.item === recordId);
			}));
		}
	}, [isProduction, setAvailableRecipes, record]);

	if (!record) {
		return;
	}
	const title = isProduction ? `Production: ${record.name}` : `Consumption: ${record.name}`;
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
				recipes={availableRecipes}
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
			isProduction,
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
							disabled={!isProduction}
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
