import { useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultInventory from "@/api/inventory.json";
import { IInventoryItem, IInventoryRecipe, TItemKey, TRecipeType } from "@/types.ts";
import { calculateAmountDisplays, clone, sumRecipes } from "@/utils/common.ts";

export const inventoryItems = defaultInventory as IInventoryItem[];

export type RootState = ReturnType<typeof store["getState"]>;

export interface IState {
	inventory: IInventoryItem[];
	activeItem?: IInventoryItem;
}

export interface IActiveItemPayload {
	record: IInventoryRecipe;
	recipeType?: TRecipeType;
}

const initialState: IState = {
	inventory: [],
};

const { actions, reducer } = createSlice({
	initialState,
	name: "inventory",
	reducers: {
		setActiveItem(state, { payload }: PayloadAction<IInventoryItem>) {
			state.activeItem = payload;
		},
		deleteRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			payload.recipe.items.forEach(({ itemId }) => {
				const found = state.inventory.find((record) => record.id === itemId);
				if (found) {
					const foundIndex = found.recipes.findIndex((record) => record.id === payload.id);
					if (foundIndex >= 0) {
						found.recipes.splice(foundIndex, 1);
					}
				}
			});
		},
		updateRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			payload.recipe.items.forEach(({ itemId }) => {
				const found = state.inventory.find((record) => record.id === itemId);
				if (found) {
					const { recipes } = found;
					const foundRecipe = recipes.find((record) => record.id === payload.id);
					if (foundRecipe) {
						recipes[recipes.indexOf(foundRecipe)] = payload;
					}
				}
			});
		},
		addRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			const processedIds: string[] = [];
			for (const { itemId } of payload.recipe.items) {
				// Some recipes produce and consume this item, so we only want 1 record representing that
				if (processedIds.find((id) => id === itemId)) {
					continue;
				}
				const found = state.inventory.find((record) => record.id === itemId);
				processedIds.push(itemId);
				if (found) {
					found.recipes.push(payload);
				}
			}
		},
		updateActiveItemRecipe({ activeItem }, { payload }: PayloadAction<IActiveItemPayload>) {
			if (!activeItem) {
				return;
			}
			const { record } = payload;
			const { id, overclockValue, machineCount, recipe, recipeType } = record;
			const { recipes } = activeItem;
			const foundIndex = recipes.findIndex((item) => item.id === id && item.recipeType === recipeType) ?? -1;
			calculateAmountDisplays(recipe.items, overclockValue, machineCount);
			if (foundIndex >= 0) {
				recipes[foundIndex] = record;
			}
			else {
				recipes.push(record);
			}
			const { produces, consumes } = sumRecipes(recipes, activeItem.id);
			activeItem.producingTotal = produces;
			activeItem.consumingTotal = consumes;
		},
		deleteActiveItemRecipe({ activeItem }, { payload }: PayloadAction<IActiveItemPayload>) {
			if (!activeItem) {
				return;
			}
			const { id } = payload.record;
			const { recipes } = activeItem;
			const foundIndex = recipes.findIndex((item) => item.id === id) ?? -1;
			if (foundIndex >= 0) {
				recipes.splice(foundIndex, 1);
			}
			const { produces, consumes } = sumRecipes(recipes, activeItem.id);
			activeItem.producingTotal = produces;
			activeItem.consumingTotal = consumes;
		},
		loadInventory(state) {
			const data = localStorage.getItem("inventory");
			const inventory: IInventoryItem[] = data ? JSON.parse(data) : clone(inventoryItems);
			inventory.forEach((item) => {
				const { produces, consumes } = sumRecipes(item.recipes, item.id);
				item.producingTotal = produces;
				item.consumingTotal = consumes;
				item.total = item.producingTotal - item.consumingTotal;
			});
			state.inventory = inventory;
		},
		saveInventory(state, { payload }: PayloadAction<boolean>) {
			// Clear
			if (payload) {
				localStorage.removeItem("inventory");
			}
			else {
				localStorage.setItem("inventory", JSON.stringify(state.inventory));
			}
		},
	},
});

export const { addRecipe, updateRecipe, deleteRecipe, loadInventory, saveInventory, setActiveItem, updateActiveItemRecipe, deleteActiveItemRecipe } = actions;

export const store = configureStore({
	reducer,
});

export const useAppSelector = useSelector.withTypes<RootState>();

export function getInventoryItem(itemId: TItemKey) {
	return store.getState().inventory.find((item) => item.id === itemId);
}
