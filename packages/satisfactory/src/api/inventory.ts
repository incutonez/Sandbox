import { useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultInventory from "@/api/inventory.json";
import { IInventoryItem, IInventoryRecipe, TItemKey } from "@/types.ts";
import { calculateAmountDisplays, clone, sumConsumes, sumProduces } from "@/utils/common.ts";

export const inventoryItems = defaultInventory as IInventoryItem[];

export type RootState = ReturnType<typeof store["getState"]>;

export interface IState {
	inventory: IInventoryItem[];
	activeItem?: IInventoryItem;
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
			payload.recipe.consumes.forEach((consumes) => {
				const found = state.inventory.find((record) => record.id === consumes.item);
				if (found) {
					const foundIndex = found.consumedBy.findIndex((record) => record.id === payload.id);
					if (foundIndex >= 0) {
						found.consumedBy.splice(foundIndex, 1);
					}
				}
			});
			payload.recipe.produces.forEach((produces) => {
				const found = state.inventory.find((record) => record.id === produces.item);
				if (found) {
					const foundIndex = found.producedBy.findIndex((record) => record.id === payload.id);
					if (foundIndex >= 0) {
						found.producedBy.splice(foundIndex, 1);
					}
				}
			});
		},
		updateRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			payload.recipe.consumes.forEach((consumes) => {
				const found = state.inventory.find((record) => record.id === consumes.item);
				if (found) {
					const foundIndex = found.consumedBy.findIndex((record) => record.id === payload.id);
					if (foundIndex >= 0) {
						found.consumedBy[foundIndex] = payload;
					}
				}
			});
			payload.recipe.produces.forEach((produces) => {
				const found = state.inventory.find((record) => record.id === produces.item);
				if (found) {
					const foundIndex = found.producedBy.findIndex((record) => record.id === payload.id);
					if (foundIndex >= 0) {
						found.producedBy[foundIndex] = payload;
					}
				}
			});
		},
		addRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			payload.recipe.consumes.forEach((consumes) => {
				const found = state.inventory.find((record) => record.id === consumes.item);
				if (found) {
					found.consumedBy.push(payload);
				}
			});
			payload.recipe.produces.forEach((produces) => {
				const found = state.inventory.find((record) => record.id === produces.item);
				if (found) {
					found.producedBy.push(payload);
				}
			});
		},
		updateActiveItemRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			const foundIndex = state.activeItem?.producedBy.findIndex((item) => item.id === payload.id) ?? -1;
			calculateAmountDisplays(payload.recipe.produces, payload.overclockValue);
			calculateAmountDisplays(payload.recipe.consumes, payload.overclockValue);
			if (foundIndex >= 0) {
				state.activeItem!.producedBy[foundIndex] = payload;
			}
			else {
				state.activeItem!.producedBy.push(payload);
			}
		},
		deleteActiveItemRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			const foundIndex = state.activeItem?.producedBy.findIndex((item) => item.id === payload.id) ?? -1;
			if (foundIndex >= 0) {
				state.activeItem!.producedBy.splice(foundIndex, 1);
			}
		},
		loadInventory(state) {
			const data = localStorage.getItem("inventory");
			const inventory: IInventoryItem[] = data ? JSON.parse(data) : clone(inventoryItems);
			inventory.forEach((item) => {
				item.producingTotal = sumProduces(item.producedBy, item.id);
				item.consumingTotal = sumConsumes(item.consumedBy, item.id);
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
