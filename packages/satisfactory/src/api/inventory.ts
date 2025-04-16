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

export interface IActiveItemPayload {
	record: IInventoryRecipe;
	isProduction: boolean;
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
		updateActiveItemRecipe({ activeItem }, { payload }: PayloadAction<IActiveItemPayload>) {
			if (!activeItem) {
				return;
			}
			const { record } = payload;
			const { id, overclockValue, machineCount } = record;
			const data = payload.isProduction ? activeItem.producedBy : activeItem.consumedBy;
			const recipe = record.recipe;
			const foundIndex = data.findIndex((item) => item.id === id) ?? -1;
			calculateAmountDisplays(recipe.produces, overclockValue, machineCount);
			calculateAmountDisplays(recipe.consumes, overclockValue, machineCount);
			if (foundIndex >= 0) {
				data[foundIndex] = record;
			}
			else {
				data.push(record);
			}
			activeItem.producingTotal = sumProduces(activeItem.producedBy, activeItem.id);
			activeItem.consumingTotal = sumConsumes(activeItem.consumedBy, activeItem.id);
		},
		deleteActiveItemRecipe({ activeItem }, { payload }: PayloadAction<IActiveItemPayload>) {
			if (!activeItem) {
				return;
			}
			const { id } = payload.record;
			const data = payload.isProduction ? activeItem.producedBy : activeItem.consumedBy;
			const foundIndex = data.findIndex((item) => item.id === id) ?? -1;
			if (foundIndex >= 0) {
				data.splice(foundIndex, 1);
			}
			activeItem.producingTotal = sumProduces(activeItem.producedBy, activeItem.id);
			activeItem.consumingTotal = sumConsumes(activeItem.consumedBy, activeItem.id);
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
