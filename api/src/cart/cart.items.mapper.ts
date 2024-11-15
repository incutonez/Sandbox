import { Injectable } from "@nestjs/common";
import { CartItemModel, ICartItemAddModel } from "src/db/models/CartItemModel";
import { CartItemAddEntity, CartItemEntity } from "src/models/cart.item.entity";
import { ProductsMapper } from "src/products/products.mapper";

@Injectable()
export class CartItemsMapper {
	constructor(private readonly productsMapper: ProductsMapper) {
	}

	modelToViewModel({ user_id, product_id, total = 1, product }: CartItemModel): CartItemEntity {
		return {
			count: total,
			product: product ? this.productsMapper.modelToListViewModel(product) : undefined,
			userId: user_id,
			productId: product_id,
		};
	}

	addViewModelToModel({ userId, productId }: CartItemAddEntity): ICartItemAddModel {
		return {
			user_id: userId,
			product_id: productId,
		};
	}
}
