import { Cell } from "@tanstack/react-table";
import { getInventoryItem } from "@/api/inventory.ts";
import { IInventoryItem, TItemKey } from "@/types.ts";

interface ICellItemName {
	cell: Cell<IInventoryItem, unknown>;
}

export function CellItemName({ cell }: ICellItemName) {
	return (
		<article className="flex space-x-2">
			<CellItemImage itemId={cell.row.original.id} />
			<span>
				{cell.getValue() as string}
			</span>
		</article>
	);
}

export function CellItemImage({ itemId }: { itemId: TItemKey }) {
	const record = getInventoryItem(itemId);
	if (!record) {
		return;
	}
	return (
		<img
			className="size-6"
			alt={record.name}
			src={record.image}
		/>
	);
}
