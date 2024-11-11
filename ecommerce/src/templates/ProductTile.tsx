import { ReactNode } from "react";
import { ProductListEntity } from "@incutonez/spec";
import { Link } from "@tanstack/react-router";
import { IconCartAdd, IconCartRemove } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { RouteViewProduct } from "@/routes.ts";
import { getImageUrl } from "@/utils.ts";

export interface IProductTile {
	record: ProductListEntity;
}

/**
 * TODOJEF: Pick up here and add the checkout functionality in the API... will need a new table that has the userId and what items they have in their cart
 * ... then when that item is rendered, there should be an indication showing how many of it are in the cart/the ability to remove/add more
 */
export function ProductTile({ record }: IProductTile) {
	const cartTotal = 0;
	let cartTotalText: ReactNode;
	if (cartTotal) {
		cartTotalText = (
			<span className="text-sm">
				{cartTotal}
				{" "}
				in cart
			</span>
		);
	}
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
			<section className="w-full rounded-b border border-t-0 p-2">
				<span className="font-semibold capitalize">
					{record.name}
				</span>
				<div className="line-clamp-2 w-32 text-sm">
					{record.description}
				</div>
				<RatingStars rating={record.rating} />
				<ProductPrice
					className="pb-2 pt-1"
					price={record.price}
				/>
				<section className="flex items-center justify-between">
					<BaseButton
						icon={IconCartAdd}
						iconCls="size-5"
						title="Add to Cart"
						size="h-6"
					/>
					{cartTotalText}
					<BaseButton
						icon={IconCartRemove}
						iconCls="size-5"
						title="Remove from Cart"
						size="h-6"
						hidden={!cartTotal}
					/>
				</section>
			</section>
		</Link>
	);
}
