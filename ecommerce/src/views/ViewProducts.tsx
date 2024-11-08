import { BaseHTMLAttributes, Suspense, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { BasePagination } from "@/components/BasePagination.tsx";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ContextProductsStore } from "@/hooks/products.ts";
import { ProductTile } from "@/views/products/ProductTile.tsx";

export type IProductsList = BaseHTMLAttributes<HTMLElement>;

function ProductsList({ className = "" }: IProductsList) {
	const { api, loadRecords } = useContext(ContextProductsStore);
	const { data } = useSuspenseQuery({
		queryKey: ["ViewProducts", api.params],
		queryFn: async () => {
			return await loadRecords();
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
	className = classNames("flex flex-wrap gap-4 p-4", className);

	return (
		<article className={className}>
			{productTiles}
		</article>
	);
}

export function ViewProducts() {
	return (
		<article className="relative flex flex-1 flex-col overflow-hidden">
			<Suspense fallback={<LoadingMask className="flex-1" />}>
				<ProductsList className="grow overflow-auto" />
			</Suspense>
			<BasePagination />
		</article>
	);
}
