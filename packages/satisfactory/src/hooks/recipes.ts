import { useState } from "react";
import { IRecipe } from "@/types.ts";
import { uuid } from "@/utils/common.ts";

export function useRecipes(initialState: IRecipe[] = []) {
	const [recipesState, setRecipesState] = useState(initialState);

	function updateRecipe(data?: IRecipe) {
		if (!data) {
			return;
		}
		setRecipesState(recipesState.map((recipe: IRecipe) => {
			if (recipe.rowId === data.rowId) {
				return data;
			}
			return recipe;
		}));
	}

	function deleteRecipe(data: IRecipe) {
		setRecipesState(recipesState.filter((recipe: IRecipe) => recipe.rowId !== data.rowId));
	}

	function createRecipe(data: IRecipe) {
		data.rowId = uuid();
		setRecipesState([...recipesState, data]);
	}

	return {
		recipesState,
		createRecipe,
		updateRecipe,
		deleteRecipe,
	};
}
