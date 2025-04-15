import { getInventoryItem } from "@/api/inventory.ts";
import { CellItemImage } from "@/components/CellItem.tsx";
import { IRecipeItem } from "@/types.ts";
import { pluralize } from "@/utils/common.ts";

export interface IRecipeItems {
	items?: IRecipeItem[];
	overclock: number;
	somersloop: number;
}

export function RecipeItems({ items = [], overclock, somersloop }: IRecipeItems) {
	// TODOJEF: FIX THIS... might need another selector for mapping or something
	// TODOJEF: Potentially use thunks
	overclock /= 100;
	return items.map((item) => {
		const inventoryItem = getInventoryItem(item.item);
		if (!inventoryItem) {
			return;
		}
		const amount = item.amountPerMinute;
		return (
			<div
				key={`consumes_${item.item}`}
				className="flex space-x-1 items-center"
				title={inventoryItem.name}
			>
				<span>
					{item.amountPerMinute * overclock}
				</span>
				<CellItemImage itemId={item.item} />
				<span>
					{pluralize(inventoryItem.name, amount)}
				</span>
				<span>/</span>
				<span>minute</span>
			</div>
		);
	});
}
