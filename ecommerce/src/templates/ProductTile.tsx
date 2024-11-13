import { ReactNode } from "react";
import { ProductListEntity } from "@incutonez/spec";
import { Link } from "@tanstack/react-router";
import classNames from "classnames";
import { CartItemsAPI } from "@/apiConfig.ts";
import { IconCartAdd, IconCartRemove } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { ProductPrice } from "@/components/ProductPrice.tsx";
import { RatingStars } from "@/components/RatingStars.tsx";
import { ContextProductRecord, useCart, useProductRecord } from "@/contexts.ts";
import { getCartItemTotal } from "@/hooks/user.ts";
import { RouteViewProduct } from "@/routes.ts";
import { getImageUrl } from "@/utils.ts";

export interface IProductTile {
	record: ProductListEntity;
}

export function ProductImage() {
	const record = useProductRecord();
	return (
		<img
			src={getImageUrl(record.image.id)}
			className="size-52 object-cover"
			alt={record.image.name}
		/>
	);
}

export function ProductTitle() {
	const record = useProductRecord();
	return (
		<span
			className="line-clamp-1 font-semibold capitalize hover:text-sky-800"
			title={record.name}
		>
			{record.name}
		</span>
	);
}

export function ProductDescription({ clamp = "line-clamp-2", className = "" }: { clamp?: string; className?: string }) {
	const record = useProductRecord();
	className = classNames("text-sm hover:text-sky-800", clamp, className);
	return (
		<p className={className}>
			{record.description}
		</p>
	);
}

export function ProductCartButtons() {
	const record = useProductRecord();
	const { refetch } = useCart();
	const cartTotal = getCartItemTotal(record.id!);
	let cartTotalText: ReactNode;

	async function onClickCartAdd() {
		await CartItemsAPI.add({
			productId: record.id!,
		});
		await refetch();
	}

	async function onClickCartRemove() {
		await CartItemsAPI.remove(record.id!);
		await refetch();
	}

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
		<section className="flex items-center justify-between">
			<BaseButton
				icon={IconCartAdd}
				iconCls="size-5"
				title="Add to Cart"
				size="h-7"
				onClick={onClickCartAdd}
			/>
			{cartTotalText}
			<BaseButton
				icon={IconCartRemove}
				iconCls="size-5"
				title="Remove from Cart"
				size="h-7"
				hidden={!cartTotal}
				onClick={onClickCartRemove}
			/>
		</section>
	);
}

/**
 * TODOJEF: Pick up here and add the checkout functionality in the API... will need a new table that has the userId and what items they have in their cart
 * ... then when that item is rendered, there should be an indication showing how many of it are in the cart/the ability to remove/add more
 */
export function ProductTile({ record }: IProductTile) {
	return (
		<ContextProductRecord.Provider value={record}>
			<article className="flex max-w-52 flex-col items-center rounded">
				<Link
					to={RouteViewProduct}
					params={{
						productId: record.id!,
					}}
					className="flex flex-col"
				>
					<ProductImage />
					<section className="flex w-full flex-col items-stretch border-x p-2">
						<ProductTitle />
						<ProductDescription />
					</section>
				</Link>
				<section className="flex w-full flex-col rounded-b border-x border-b px-2 pb-2">
					<RatingStars rating={record.rating} />
					<ProductPrice
						className="pb-2 pt-1"
						price={record.price}
					/>
					<ProductCartButtons />
				</section>
			</article>
		</ContextProductRecord.Provider>
	);
}
