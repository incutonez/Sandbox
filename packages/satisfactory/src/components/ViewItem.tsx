import { useEffect, useRef, useState } from "react";
import clone from "just-clone";
import { recipes } from "@/api/recipes.ts";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { ComboBox } from "@/components/ComboBox.tsx";
import { IconAdd, IconDelete, IconSave } from "@/components/Icons.tsx";
import { useRecipes } from "@/hooks/recipes.ts";
import { IInventoryItem, IRecipe } from "@/types.ts";

export interface IViewItem extends IBaseDialog {
	record?: IInventoryItem;
}

// TODOJEF: On save, it needs to update the associations in consuming AND producing
export function ViewItem({ record, show, setShow }: IViewItem) {
	const recordClone = useRef<IInventoryItem>(undefined);
	const [availableRecipes, setAvailableRecipes] = useState<IRecipe[]>(recipes);
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe>();
	const { recipesState, createRecipe, updateRecipe, deleteRecipe } = useRecipes(recordClone.current?.producing);
	useEffect(() => {
		if (record) {
			recordClone.current = clone(record);
			setAvailableRecipes(recipes.filter((recipe) => recipe.produces.find((produce) => produce.item === record.id)));
		}
	}, [record]);
	if (!recordClone.current) {
		return;
	}
	const title = `${recordClone.current.name} Production`;
	const footerButtons = (
		<BaseButton
			text="Save"
			icon={IconSave}
		/>
	);
	const selectedRecipes = recipesState.map((recipe) => {
		return (
			<section
				className="flex space-x-4"
				key={recipe.rowId}
			>
				<ComboBox
					value={recipe.id}
					setSelection={(newRecipe) => updateRecipe(newRecipe)}
					options={availableRecipes}
					valueField="id"
					displayField="name"
					inputCls="w-68"
				/>
				<BaseButton
					icon={IconDelete}
					title="Delete Recipe"
					onClick={() => deleteRecipe(recipe)}
				/>
			</section>
		);
	});

	function onClickAddRecipe() {
		if (selectedRecipe) {
			createRecipe({
				...selectedRecipe,
			});
			setSelectedRecipe(undefined);
		}
	}

	// TODOJEF: I think turn this into a grid instead, with actions to delete?
	return (
		<BaseDialog
			title={title}
			show={show}
			setShow={setShow}
			footerSlot={footerButtons}
		>
			<article className="flex flex-col space-y-4">
				<section className="flex space-x-4 items-center">
					<ComboBox
						label="Recipe"
						value={selectedRecipe?.id ?? ""}
						setSelection={(newRecipe) => setSelectedRecipe(newRecipe)}
						options={availableRecipes}
						valueField="id"
						displayField="name"
						inputCls="w-68"
					/>
					<BaseButton
						title="Add Recipe"
						disabled={!selectedRecipe}
						icon={IconAdd}
						onClick={onClickAddRecipe}
					/>
				</section>
				{selectedRecipes}
			</article>
		</BaseDialog>
	);
}
