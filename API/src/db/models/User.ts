import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Address } from "src/db/models/Address";

@Table({
	tableName: "users",
})
export class User extends Model {
	@Column({
		primaryKey: true,
	})
	id: number;

	@Column
	first_name: string;

	@Column
	last_name: string;

	@Column
	phone: string;

	@Column
	email: string;

	@Column
	gender: string;

	@Column
	birth_date: number;

	@ForeignKey(() => Address)
	@Column
	address_id: number;

	@BelongsTo(() => Address)
	address: Address;
}
