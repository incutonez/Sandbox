import { IInventoryRecipe, IRecipeItem, TItemKey } from "@/types.ts";

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

export function calculateAmountDisplays(recipes: IRecipeItem[], overclock: number) {
	overclock /= 100;
	recipes.forEach((item) => {
		item.amountPerMinuteDisplay = item.amountPerMinute * overclock;
		item.amountPerCycleDisplay = item.amountPerCycle * overclock;
	});
}
