import { copyFileSync, writeFileSync } from "fs";
import camelCase from "just-camel-case";
import path from "path";
import { IInventoryItem, IRecipe, IRecipeItem, TItemKey } from "@/types.ts";
import data from "./satisfactory.json";

export interface ISatisfactoryData {
	items: ISatisfactoryItem[];
	recipes: ISatisfactoryRecipe[];
}

export interface ISatisfactoryItem {
	slug: string;
	icon: string;
	name: string;
	description: string;
	sinkPoints: number;
	className: string;
	stackSize: number;
	energyValue: number;
	radioactiveDecay: number;
	liquid: boolean;
	fluidColor: {
		r: number;
		g: number;
		b: number;
		a: number;
	};
}

export interface ISatisfactoryRecipe {
	slug: string;
	name: string;
	className: string;
	alternate: boolean;
	time: number;
	inHand: boolean;
	forBuilding: boolean;
	inWorkshop: boolean;
	inMachine: boolean;
	// This is the number added to manual crafting of this item
	manualTimeMultiplier: number;
	ingredients: {
		item: string;
		amount: number;
	}[];
	products: {
		item: string;
		amount: number;
	}[];
	producedIn: string[];
	isVariablePower: boolean;
	minPower: number;
	maxPower: number;
}

const inventoryMapping: Record<string, string> = {};
const itemsOut: IInventoryItem[] = [];
const recipesOut: IRecipe[] = [];
const CopyItems = false;
const CopyRecipes = true;
const OutputDir = path.join("./src", "api");
const { items, recipes } = data as unknown as ISatisfactoryData;

const ImageDir = path.join("/Users", "incut", "workspace", "SatisfactoryTools", "www", "assets", "images", "items");
for (const key in items) {
	const item = items[key];
	const id = camelCase(item.slug) as TItemKey;
	const image = `${id}.png`;
	inventoryMapping[item.className] = id;
	itemsOut.push({
		id,
		image,
		name: item.name,
		producedBy: [],
		producingTotal: 0,
		consumedBy: [],
		consumingTotal: 0,
		total: 0,
	});
	if (CopyItems) {
		copyFileSync(path.join(ImageDir, `${item.icon}_256.png`), path.join("./public", image));
	}
}

for (const key in recipes) {
	const recipe = recipes[key];
	const productionCycleTime = recipe.time;
	const cyclesPerMinute = 60 / productionCycleTime;
	const id = camelCase(recipe.slug);
	const consumes: IRecipeItem[] = [];
	const produces: IRecipeItem[] = [];
	recipe.ingredients.forEach((ingredient) => {
		consumes.push({
			item: inventoryMapping[ingredient.item] as TItemKey,
			amountPerCycle: ingredient.amount,
			amountPerMinute: ingredient.amount * cyclesPerMinute,
		});
	});
	recipe.products.forEach((product) => {
		produces.push({
			item: inventoryMapping[product.item] as TItemKey,
			amountPerCycle: product.amount,
			amountPerMinute: product.amount * cyclesPerMinute,
		});
	});
	recipesOut.push({
		id,
		productionCycleTime,
		cyclesPerMinute,
		consumes,
		produces,
		name: recipe.name,
		isAlternate: recipe.alternate,
		// TODOJEF: need to get a list of machines
		producedIn: recipe.producedIn,
	});
}

if (CopyItems) {
	writeFileSync(path.join(OutputDir, "inventory.json"), JSON.stringify(itemsOut));
}
if (CopyRecipes) {
	writeFileSync(path.join(OutputDir, "recipes.json"), JSON.stringify(recipesOut));
}
