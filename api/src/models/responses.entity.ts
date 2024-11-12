import { GetResponseModel } from "src/models/base.list.entity";
import { CartEntity } from "src/models/cart.entity";
import { CategoryEntity } from "src/models/category.entity";
import { TreeChangeModel } from "src/models/diff.entity";
import { LeagueMatchEntity } from "src/models/league.match.entity";
import { ProductListEntity } from "src/models/product.entity";
import { UserEntity } from "src/models/user.entity";

export class TreeChangeResponseModel extends GetResponseModel<TreeChangeModel>(TreeChangeModel) {}
export class UserResponseModel extends GetResponseModel<UserEntity>(UserEntity) {}
export class ProductResponseModel extends GetResponseModel<ProductListEntity>(ProductListEntity) {}
export class CategoryResponseModel extends GetResponseModel<CategoryEntity>(CategoryEntity) {}
export class CartResponseModel extends GetResponseModel<CartEntity>(CartEntity) {}
export class LeagueMatchResponseModel extends GetResponseModel<LeagueMatchEntity>(LeagueMatchEntity) {}
export class BulkResponse {
	index: number;
	message: string[];
}
