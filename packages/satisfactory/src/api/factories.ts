import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uuid } from "@/utils/common.ts";

export interface IFactory {
	id: string;
	name: string;
}

export interface IFactoryState {
	factories: IFactory[];
	activeFactory?: IFactory;
}

const initialState: IFactoryState = {
	factories: [],
};

export const factoriesSlice = createSlice({
	initialState,
	name: "factories",
	reducers: {
		loadFactories(state) {
			let factories: IFactory[] = [{
				id: uuid(),
				name: "Default Factory",
			}];
			const factoriesData = localStorage.getItem("factories");
			if (factoriesData) {
				factories = JSON.parse(factoriesData) as IFactory[];
			}
			state.factories = factories;
		},
		setActiveFactory(state, { payload }: PayloadAction<IFactory>) {
			state.activeFactory = payload;
		},
		setActiveFactoryName(state, { payload }: PayloadAction<IFactory>) {
			const found = state.factories.find((factory) => factory.id === payload.id);
			if (found) {
				found.name = payload.name;
				localStorage.setItem("factories", JSON.stringify(state));
			}
		},
	},
});

export const { setActiveFactory, setActiveFactoryName, loadFactories } = factoriesSlice.actions;
