import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { ProductModel } from "src/db/models/ProductModel";
import { User } from "src/db/models/User";

@Table({
	tableName: "reviews",
	timestamps: false,
})
export class ReviewModel extends Model {
  @PrimaryKeyGuid()
  declare id: string;

  @Column
  declare title: string;

  @Column
  declare description: string;

  @Column
  declare rating: number;

  @Column
  declare created_date: number;

  @ForeignKey(() => User)
  @Column
  declare created_by: string;

  @ForeignKey(() => ProductModel)
  @Column
  declare product_id: string;
}
