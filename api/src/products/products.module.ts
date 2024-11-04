import { Module } from "@nestjs/common";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { ImagesMapper } from "src/images/images.mapper";
import { ProductsController } from "src/products/products.controller";
import { ProductsMapper } from "src/products/products.mapper";
import { ProductsService } from "src/products/products.service";
import { ReviewsMapper } from "src/reviews/reviews.mapper";
import { UsersMapper } from "src/users/users.mapper";

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductsMapper, ImagesMapper, ReviewsMapper, CategoriesMapper, UsersMapper],
})
export class ProductsModule {
}
