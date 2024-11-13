import { CartItemModel, ICartItemAddModel } from "src/db/models/CartItemModel";
import { CartItemAddEntity, CartItemEntity } from "src/models/cart.item.entity";

export class CartItemsMapper {
	modelToViewModel({ user_id, product_id, count = 1 }: CartItemModel): CartItemEntity {
		return {
			count,
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
