import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DateEpoch } from "src/db/decorators";
import { ProductModel } from "src/db/models/ProductModel";
import { User } from "src/db/models/User";
import { ModelInterface } from "src/types";

export type ICartItemModel = ModelInterface<CartItemModel>;

export type ICartItemAddModel = Pick<ICartItemModel, "user_id" | "product_id">;

@Table({
	tableName: "cart_items",
	timestamps: false,
})
export class CartItemModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => User)
  @Column
  declare user_id: string;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;

  @DateEpoch()
  declare created_date: number;

  count?: number;
}
