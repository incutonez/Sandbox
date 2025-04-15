import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { deleteActiveItemRecipe, updateActiveItemRecipe, useAppSelector } from "@/api/inventory.ts";
import { recipes } from "@/api/recipes.ts";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { IconAdd, IconDelete, IconEdit, IconSave } from "@/components/Icons.tsx";
import { TableData } from "@/components/TableData.tsx";
import { IInventoryItem, IInventoryRecipe, IRecipe, IRecipeItem } from "@/types.ts";
import { ViewRecipe } from "@/views/ViewRecipe.tsx";

export interface IViewItem extends IBaseDialog {
	onClickSave: (recipes: IInventoryItem) => void;
}

export function ViewInventoryItem({ show, setShow, onClickSave }: IViewItem) {
	let viewRecipeNode;
	const dispatch = useDispatch();
	const record = useAppSelector((state) => state.activeItem);
	const data = useAppSelector((state) => state.activeItem?.producedBy) ?? [];
	const [selectedRecipe, setSelectedRecipe] = useState<IInventoryRecipe>();
	const [availableRecipes, setAvailableRecipes] = useState<IRecipe[]>(recipes);
	const [showRecipe, setShowRecipe] = useState(false);
	const table = useReactTable({
		data,
		columns: [{
			id: "actions",
			meta: {
				cellCls: "flex justify-center space-x-2",
				columnWidth: "min-w-auto",
			},
			cell: (info) => {
				return (
					<>
						<BaseButton
							icon={IconDelete}
							title="Delete Recipe"
							onClick={() => dispatch(deleteActiveItemRecipe(info.row.original))}
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
		}, {
			header: "Somersloop",
			accessorKey: "somersloopValue",
			cell: (info) => info.getValue(),
		}, {
			header: "Amount",
			accessorKey: "recipe.produces",
			cell: (info) => {
				const value = info.getValue<IRecipeItem[]>();
				const found = value.find((item) => item.item === record?.id);
				if (!found) {
					return;
				}
				// TODOJEF: Need to fix initial display of this value
				// TODOJEF: Need to fix when we edit producing... it shows old value if we had deleted previous data
				return (
					<span>
						{found.amountPerMinuteDisplay}
					</span>
				);
			},
		}],
		getCoreRowModel: getCoreRowModel(),
	});

	useEffect(() => {
		if (record) {
			setAvailableRecipes(recipes.filter((recipe) => recipe.produces.find((produce) => produce.item === record.id)));
		}
	}, [setAvailableRecipes, record]);

	if (!record) {
		return;
	}
	const title = `${record.name} Production`;
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

	function onSaveRecipe(recipe: IInventoryRecipe) {
		dispatch(updateActiveItemRecipe(recipe));
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
					<TableData table={table} />
				</article>
			</BaseDialog>
			{viewRecipeNode}
		</>
	);
}
