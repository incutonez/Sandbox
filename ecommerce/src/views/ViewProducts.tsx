import { BaseHTMLAttributes } from "react";
import classNames from "classnames";
import { BasePagination } from "@/components/BasePagination.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { NavigationMain } from "@/components/NavigationMain.tsx";
import { ContextPaginatedApi, usePaginatedApi } from "@/hooks/api.ts";
import { useLoadProducts } from "@/hooks/products.ts";
import { ProductTile } from "@/views/products/ProductTile.tsx";

export type IProductsList = BaseHTMLAttributes<HTMLElement>;

function ProductsList({ className = "" }: IProductsList) {
	const { data, isFetching } = useLoadProducts();
	if (isFetching) {
		return (
			<LoadingMask className={className} />
		);
	}
	const productTiles = data?.map((record) => {
		return (
			<ProductTile
				record={record}
				key={record.id}
			/>
		);
	});
	className = classNames("flex flex-wrap gap-4 p-4", className);

	return (
		<article className={className}>
			{productTiles}
		</article>
	);
}

export function ViewProducts() {
	const api = usePaginatedApi();
	return (
		<ContextPaginatedApi.Provider value={api}>
			<NavigationMain />
			<article className="relative flex flex-1 flex-col overflow-hidden">
				<ProductsList className="flex-1 overflow-auto" />
				<BasePagination	/>
			</article>
		</ContextPaginatedApi.Provider>
	);
}
