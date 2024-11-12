import { Injectable } from "@nestjs/common";
import { CartsMapper } from "src/cart/carts.mapper";
import { CartModel } from "src/db/models/CartModel";
import { CartAddEntity } from "src/models/cart.entity";
import { ProfileEntity } from "src/models/profile.entity";

@Injectable()
export class CartsService {
	constructor(private mapper: CartsMapper) {
	}

	async addToCart(user: ProfileEntity, model: CartAddEntity) {
		model.userId ??= user.sub;
		await CartModel.create(this.mapper.addViewModelToModel(model));
	}

	async getCartByUser(userId: string) {
		const { count, rows } = await CartModel.findAndCountAll({
			where: {
				user_id: userId,
			},
		});
		return {
			total: count,
			data: rows.map((product) => this.mapper.modelToViewModel(product)),
		};
	}
}
