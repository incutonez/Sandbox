import { Injectable } from "@nestjs/common";
import { CartItemModel, ICartItemAddModel } from "src/db/models/CartItemModel";
import { CartItemAddEntity, CartItemEntity } from "src/models/cart.item.entity";
import { ProductsMapper } from "src/products/products.mapper";

@Injectable()
export class CartItemsMapper {
	constructor(private readonly productsMapper: ProductsMapper) {
	}

	modelToViewModel(model: CartItemModel): CartItemEntity {
		// We have to convert to a plain object because otherwise, the data is nested
		if (model instanceof CartItemModel) {
			model = model.getPlain();
		}
		return {
			count: model.total,
			product: model.product ? this.productsMapper.modelToListViewModel(model.product) : undefined,
			userId: model.user_id,
			productId: model.product_id,
		};
	}

	addViewModelToModel({ userId, productId }: CartItemAddEntity): ICartItemAddModel {
		return {
			user_id: userId,
			product_id: productId,
		};
	}
}
