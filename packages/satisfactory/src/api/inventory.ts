import { useSelector } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultInventory from "@/api/inventory.json";
import { IInventoryItem, IInventoryRecipe, TItemKey } from "@/types.ts";
import { sumConsumes, sumProduces } from "@/utils/common.ts";

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
		updateActiveItemRecipe(state, { payload }: PayloadAction<IInventoryRecipe>) {
			const foundIndex = state.activeItem?.producedBy.findIndex((item) => item.id === payload.id) ?? -1;
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
			const inventory: IInventoryItem[] = data ? JSON.parse(data) : inventoryItems;
			inventory.forEach((item) => {
				item.producingTotal = sumProduces(item.producedBy, item.id);
				item.consumingTotal = sumConsumes(item.consumedBy, item.id);
				item.total = item.producingTotal - item.consumingTotal;
			});
			state.inventory = inventory;
		},
		saveInventory(_state, { payload }: PayloadAction<IInventoryItem[] | undefined>) {
			if (payload) {
				localStorage.setItem("inventory", JSON.stringify(payload));
			}
			else {
				localStorage.removeItem("inventory");
			}
		},
		updateConsumedRecipe(state, { payload }: PayloadAction<{record: IInventoryItem, recipe: IInventoryRecipe}>) {
			const { record, recipe } = payload;
			const found = state.inventory.find((item) => item.id === record.id);
			if (found) {
				const foundIndex = found.consumedBy.findIndex((item) => item.id === recipe.id);
				if (foundIndex >= 0) {
					found.consumedBy[foundIndex] = recipe;
				}
			}
		},
	},
});

export const { loadInventory, saveInventory, setActiveItem, updateActiveItemRecipe, deleteActiveItemRecipe } = actions;

export const store = configureStore({
	reducer,
});

export const useAppSelector = useSelector.withTypes<RootState>();

export function getInventoryItem(itemId: TItemKey) {
	return store.getState().inventory.find((item) => item.id === itemId);
}
