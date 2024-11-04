import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({
	tableName: "categories",
	timestamps: false,
})
export class CategoryModel extends Model {
  @Column
  declare name: string;

  @ForeignKey(() => CategoryModel)
  @Column
  declare parent_id: number;
}
