import { Column, DataType, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";

@Table({
	tableName: "images",
	timestamps: false,
})
export class ImageModel extends Model {
  @PrimaryKeyGuid()
  declare id: string;

  @Column({
  	type: DataType.BLOB,
  })
  declare contents: Blob;

  @Column
  declare created_date: number;
}
