import { Cell } from "@tanstack/react-table";
import { IInventoryItem } from "@/types.ts";

interface ICellItemName {
	cell: Cell<IInventoryItem, unknown>;
}

export function CellItemName({ cell }: ICellItemName) {
	return (
		<article className="flex space-x-2">
			<img
				src={`/${cell.row.original.image}`}
				className="size-6"
			/>
			<span>
				{cell.getValue() as string}
			</span>
		</article>
	);
}
