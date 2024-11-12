import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CartsService } from "src/cart/carts.service";
import { CartAddEntity } from "src/models/cart.entity";
import { CartResponseModel } from "src/models/responses.entity";

@ApiTags("carts")
@Controller("carts")
export class CartsController {
	constructor(private readonly service: CartsService) {
	}

	@Get("")
	async getCart(@Req() req: Request): Promise<CartResponseModel> {
		return this.service.getCartByUser(req.user.sub);
	}

	@Get(":userId")
	async getCartByUser(@Param("userId") userId: string): Promise<CartResponseModel> {
		return this.service.getCartByUser(userId);
	}

	@Post("")
	@HttpCode(HttpStatus.NO_CONTENT)
	async addToCart(@Req() req: Request, @Body() body: CartAddEntity): Promise<void> {
		await this.service.addToCart(req.user, body);
	}
}
