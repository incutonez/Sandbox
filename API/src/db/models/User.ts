import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { Address } from "src/db/models/Address";
import { ModelInterface } from "src/types";

export type IUser = ModelInterface<User>;

@Table({
	tableName: "users",
	timestamps: false,
})
export class User extends Model {
	@PrimaryKeyGuid()
	id: string;

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
	address_id?: number;

	@BelongsTo(() => Address)
	address?: Address;
}
