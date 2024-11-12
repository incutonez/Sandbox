import { CartModel, ICartModel } from "src/db/models/CartModel";
import { CartAddEntity, CartEntity } from "src/models/cart.entity";

export class CartsMapper {
	modelToViewModel({ id, user_id, product_id, created_date }: CartModel): CartEntity {
		return {
			id,
			userId: user_id,
			productId: product_id,
			createdDate: created_date,
		};
	}

	addViewModelToModel({ userId, productId }: CartAddEntity): ICartModel {
		return {
			id: undefined,
			user_id: userId,
			product_id: productId,
			created_date: undefined,
		};
	}
}
