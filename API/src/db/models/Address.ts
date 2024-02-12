import { Column, Model, Table } from "sequelize-typescript";

@Table({
	tableName: "addresses",
})
export class Address extends Model {
	@Column({
		primaryKey: true,
	})
		id: number;

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
