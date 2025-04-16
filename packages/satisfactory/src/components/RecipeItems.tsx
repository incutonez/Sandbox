import classNames from "classnames";
import { getInventoryItem } from "@/api/inventory.ts";
import { CellItemImage } from "@/components/CellItem.tsx";
import { IRecipeItem, TItemKey } from "@/types.ts";
import { pluralize } from "@/utils/common.ts";

export interface IRecipeItems {
	items?: IRecipeItem[];
	highlightItem?: TItemKey;
	overclock: number;
	somersloop: number;
	machineCount: number;
}

// TODOJEF: Use somersloop value
export function RecipeItems({ items = [], overclock, somersloop, highlightItem, machineCount }: IRecipeItems) {
	overclock /= 100;
	return items.map((item) => {
		const itemId = item.item;
		const inventoryItem = getInventoryItem(itemId);
		if (!inventoryItem) {
			return;
		}
		const amount = item.amountPerMinute;
		const cls = classNames("flex space-x-1 items-center py-1 px-2 rounded-md", highlightItem === itemId ? "bg-yellow-200" : "");
		return (
			<div
				key={`consumes_${itemId}`}
				className={cls}
				title={inventoryItem.name}
			>
				<span>
					{item.amountPerMinute * overclock * machineCount}
				</span>
				<CellItemImage itemId={itemId} />
				<span>
					{pluralize(inventoryItem.name, amount)}
				</span>
				<span>/</span>
				<span>minute</span>
			</div>
		);
	});
}
