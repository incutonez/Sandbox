import { Column, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { ModelInterface } from "src/types";

export type IAddress = ModelInterface<Address>;

@Table({
	tableName: "addresses",
	timestamps: false,
})
export class Address extends Model {
	@PrimaryKeyGuid()
	declare id: number;

	@Column
	line_one: string;

	@Column
	line_two: string;

	@Column
	city: string;

	@Column
	state: string;

	@Column
	zip_code: string;
}
