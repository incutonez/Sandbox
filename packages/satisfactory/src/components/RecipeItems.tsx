import classNames from "classnames";
import { getInventoryItem } from "@/api/inventory.ts";
import { ItemImage } from "@/components/CellItem.tsx";
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
	const itemNodes = items.map((item) => {
		const itemId = item.item;
		const inventoryItem = getInventoryItem(itemId);
		if (!inventoryItem) {
			return;
		}
		const amount = item.amountPerMinute * overclock * machineCount;
		const cls = classNames("rounded-md", highlightItem === itemId ? "bg-yellow-200" : "");
		return (
			<tr
				key={`consumes_${itemId}`}
				className={cls}
				title={inventoryItem.name}
			>
				<td className="text-right px-1 py-0.5">
					{amount}
				</td>
				<td className="px-1 flex space-x-1 py-0.5">
					<ItemImage itemId={itemId} />
					<span>
						{pluralize(inventoryItem.name, amount)}
					</span>
				</td>
				<td className="px-1 py-0.5">/</td>
				<td className="px-1 py-0.5">minute</td>
			</tr>
		);
	});
	return (
		<table className="table-fixed">
			<tbody>
				{itemNodes}
			</tbody>
		</table>
	);
}
