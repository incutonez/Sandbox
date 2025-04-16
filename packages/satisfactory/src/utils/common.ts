import justCapitalize from "just-capitalize";
import { IInventoryRecipe, IRecipeItem, TItemKey } from "@/types.ts";

const CapitalizeWordBoundary = /(?=[A-Z])/;

export { default as clone } from "just-clone";

export { v4 as uuid } from "uuid";

export { default as getData } from "just-safe-get";

export { default as pluralize } from "pluralize";

export function emptyFn() {

}

export function sumProduces(value: IInventoryRecipe[], id: TItemKey) {
	return value.reduce((total, { recipe }) => {
		const found = recipe.produces.find(({ item }) => item === id)?.amountPerMinuteDisplay ?? 0;
		return total + found;
	}, 0);
}

export function sumConsumes(value: IInventoryRecipe[], id: TItemKey) {
	return value.reduce((total, { recipe }) => {
		const found = recipe.consumes.find(({ item }) => item === id)?.amountPerMinuteDisplay ?? 0;
		return total + found;
	}, 0);
}

export function calculateAmountDisplays(recipes: IRecipeItem[], overclock: number, machineCount: number) {
	overclock /= 100;
	recipes.forEach((item) => {
		item.amountPerMinuteDisplay = item.amountPerMinute * overclock * machineCount;
		item.amountPerCycleDisplay = item.amountPerCycle * overclock * machineCount;
	});
}

export function capitalizeFirstLetters(value: string) {
	const splits = value.split(CapitalizeWordBoundary);
	return splits.map((word) => justCapitalize(word)).join(" ");
}
