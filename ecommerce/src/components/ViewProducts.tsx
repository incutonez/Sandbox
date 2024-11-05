import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductsAPI } from "@/apiConfig.ts";
import { ProductTile } from "@/components/ProductTile.tsx";

export function ViewProducts() {
	// TODOJEF: Need to wire this up... PICK UP HERE TOMORROW AND FINISH THE TILE
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [start, setStart] = useState(0);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [limit, setLimit] = useState(15);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [page, setPage] = useState(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [filters, setFilters] = useState([]);
	const { data } = useSuspenseQuery({
		queryKey: [
			"ViewProducts",
			start,
			limit,
			page,
			filters,
		],
		queryFn: async () => {
			const { data } = await ProductsAPI.listProducts({
				start,
				limit,
				page,
				filters,
			});
			return data.data;
		},
	});
	const productTiles = data.map((record) => {
		return (
			<ProductTile
				record={record}
				key={record.id}
			/>
		);
	});
	return (
		<article>
			<section className="flex flex-wrap gap-4">
				{productTiles}
			</section>
		</article>
	);
}
