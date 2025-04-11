import defaultInventory from "@/api/inventory.json";
import { IInventoryItem } from "@/types.ts";

export function loadInventory(): IInventoryItem[] {
	const inventory = localStorage.getItem("inventory");
	console.log("loading");
	return inventory ? JSON.parse(inventory) : defaultInventory as unknown as IInventoryItem[];
}

export function saveInventory(items: IInventoryItem[]) {
	localStorage.setItem("inventory", JSON.stringify(items));
}
