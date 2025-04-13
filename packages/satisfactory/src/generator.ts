import { copyFileSync, writeFileSync } from "fs";
import camelCase from "just-camel-case";
import path from "path";
import { IInventoryItem, TItemKey } from "@/types.ts";
import data from "./satisfactory.json";

export interface ISatisfactoryData {
	items: ISatisfactoryItem[];
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

const inventoryItems: IInventoryItem[] = [];
const CopyItems = false;
const OutputDir = path.join("./src", "api");
const { items } = data as unknown as ISatisfactoryData;

if (CopyItems) {
	const ImageDir = path.join("/Users", "incut", "workspace", "SatisfactoryTools", "www", "assets", "images", "items");
	for (const key in items) {
		const item = items[key];
		const id = camelCase(item.slug) as TItemKey;
		const image = `${id}.png`;
		copyFileSync(path.join(ImageDir, `${item.icon}_256.png`), path.join("./public", image));
		inventoryItems.push({
			id,
			image,
			name: item.name,
			producing: [],
			producingTotal: 0,
			consuming: [],
			consumingTotal: 0,
			total: 0,
		});
	}
	writeFileSync(path.join(OutputDir, "inventory.json"), JSON.stringify(inventoryItems));
}
