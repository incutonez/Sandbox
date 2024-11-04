import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { CategoryModel } from "src/db/models/CategoryModel";
import { ImageModel } from "src/db/models/ImageModel";
import { ReviewModel } from "src/db/models/ReviewModel";

@Table({
	tableName: "products",
	timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKeyGuid()
  declare id: string;

  @Column
  declare name: string;

  @Column
  declare price: number;

  @Column
  declare description: string;

  @ForeignKey(() => CategoryModel)
  @Column
  declare category_id: number;

  @ForeignKey(() => ImageModel)
  @Column
  declare image_id: string;

  @HasMany(() => ReviewModel)
  reviews: ReviewModel[];
}
