import { useEffect, useState } from "react";
import { Key } from "react-aria-components";
import { recipes } from "@/api/recipes.ts";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { ComboBox } from "@/components/ComboBox.tsx";
import { IInventoryItem, IRecipe } from "@/types.ts";

export interface IViewItem extends IBaseDialog {
	record?: IInventoryItem;
}

export function ViewItem({ record, show, setShow }: IViewItem) {
	const [recipeId, setRecipeId] = useState<Key | null>(null);
	const [selectedRecipe, setSelectedRecipe] = useState<IRecipe>();
	const [availableRecipes, setAvailableRecipes] = useState<IRecipe[]>(recipes);
	useEffect(() => {
		if (record) {
			setAvailableRecipes(recipes.filter((recipe) => recipe.produces.find((produce) => produce.item === record.id)));
		}
	}, [record]);
	if (!record) {
		return;
	}
	const title = `${record.name} Production`;

	return (
		<BaseDialog
			title={title}
			show={show}
			setShow={setShow}
		>
			Selected:
			{" "}
			{selectedRecipe?.name}
			<ComboBox
				value={recipeId}
				setValue={setRecipeId}
				setSelection={setSelectedRecipe}
				options={availableRecipes}
				valueField="id"
				displayField="name"
				inputCls="w-68"
			/>
		</BaseDialog>
	);
}
