import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Address } from "src/db/models/Address";
import { CartItemModel } from "src/db/models/CartItemModel";
import { CategoryModel } from "src/db/models/CategoryModel";
import { ImageModel } from "src/db/models/ImageModel";
import { LeagueMatch } from "src/db/models/LeagueMatch";
import { ProductModel } from "src/db/models/ProductModel";
import { ReviewModel } from "src/db/models/ReviewModel";
import { User } from "src/db/models/User";

export const DBConfig: SequelizeModuleOptions = {
	dialect: "sqlite",
	storage: "src/db/data.db",
	host: "localhost",
	models: [User, Address, LeagueMatch, ImageModel, CategoryModel, ReviewModel, ProductModel, CartItemModel],
};
