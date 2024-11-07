import { useContext, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BaseButton } from "@/components/BaseButton.tsx";
import { IconNext, IconPrevious } from "@/components/icons.tsx";
import { ProductTile } from "@/components/ProductTile.tsx";
import { ContextStoreProducts } from "@/contexts.ts";

export function ViewProducts() {
	const { params, nextPage, previousPage, loadRecords } = useContext(ContextStoreProducts);
	const previousDisabled = useMemo(() => params.page <= 1, [params.page]);
	const { data } = useSuspenseQuery({
		queryKey: ["ViewProducts", params],
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

	function onClickPrevious() {
		previousPage();
	}

	function onClickNext() {
		nextPage();
	}

	return (
		<article>
			<section className="flex">
				<BaseButton
					icon={IconPrevious}
					disabled={previousDisabled}
					onClick={onClickPrevious}
				/>
				<BaseButton
					icon={IconNext}
					iconAfter
					onClick={onClickNext}
				/>
			</section>
			<section className="flex flex-wrap gap-4">
				<span>
					{/*{record.name}*/}
				</span>
				{productTiles}
			</section>
		</article>
	);
}
