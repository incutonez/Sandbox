import defaultInventory from "@/api/inventory.json";
import { IInventoryItem } from "@/types.ts";
import { sum } from "@/utils/common.ts";

export function loadInventory() {
	const data = localStorage.getItem("inventory");
	const inventory: IInventoryItem[] = data ? JSON.parse(data) : defaultInventory;
	inventory.forEach((item) => {
		item.producingTotal = sum(item.producing);
		item.consumingTotal = sum(item.consuming);
		item.total = item.producingTotal - item.consumingTotal;
	});
	return inventory;
}

export function saveInventory(items: IInventoryItem[]) {
	localStorage.setItem("inventory", JSON.stringify(items));
}
