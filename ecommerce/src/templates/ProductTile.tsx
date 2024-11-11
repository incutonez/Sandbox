import { ProductListEntity } from "@incutonez/spec";
import { Link } from "@tanstack/react-router";
import { RouteViewProduct } from "@/routes.ts";
import { getImageUrl } from "@/utils.ts";

export interface IProductTile {
	record: ProductListEntity;
}

export function ProductTile({ record }: IProductTile) {
	return (
		<Link
			to={RouteViewProduct}
			params={{
				productId: record.id!,
			}}
			className="flex min-w-48 flex-col items-center rounded"
		>
			<img
				src={getImageUrl(record.image.id)}
				className="size-48 object-cover"
				alt={record.image.name}
			/>
			<section className="h-32 w-full rounded-b border border-t-0 p-2">
				<span className="capitalize">
					{record.name}
				</span>
			</section>
		</Link>
	);
}
