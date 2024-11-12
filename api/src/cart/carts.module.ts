import { Module } from "@nestjs/common";
import { CartsController } from "src/cart/carts.controller";
import { CartsMapper } from "src/cart/carts.mapper";
import { CartsService } from "src/cart/carts.service";

@Module({
	controllers: [CartsController],
	providers: [CartsService, CartsMapper],
})
export class CartsModule {
}
