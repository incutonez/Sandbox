import { Module } from "@nestjs/common";
import { CartItemsController } from "src/cart/cart.items.controller";
import { CartItemsMapper } from "src/cart/cart.items.mapper";
import { CartItemsService } from "src/cart/cart.items.service";

@Module({
	controllers: [CartItemsController],
	providers: [CartItemsService, CartItemsMapper],
})
export class CartItemsModule {
}
