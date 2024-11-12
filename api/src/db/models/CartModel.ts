import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "src/db/models/ProductModel";
import { User } from "src/db/models/User";
import { ModelInterface } from "src/types";

export type ICartModel = ModelInterface<CartModel>;

@Table({
	tableName: "carts",
	timestamps: false,
})
export class CartModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => User)
  @Column
  declare user_id: string;

  @ForeignKey(() => ProductModel)
  @Column
  product_id: string;

  @Column
  created_date: number;
}
