import { AutoIncrement, BelongsTo, Column, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { DateEpoch } from "src/db/decorators";
import { BaseModel } from "src/db/models/BaseModel";
import { ProductModel } from "src/db/models/ProductModel";
import { User } from "src/db/models/User";
import { ModelInterface } from "src/types";

export type ICartItemModel = ModelInterface<CartItemModel>;

export type ICartItemAddModel = Pick<ICartItemModel, "user_id" | "product_id">;

@Table({
	tableName: "cart_items",
	timestamps: false,
})
export class CartItemModel extends BaseModel {
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

  total?: number;

  @BelongsTo(() => ProductModel, "product_id")
  product?: ProductModel;

  @BelongsTo(() => User, "user_id")
  user?: User;
}
