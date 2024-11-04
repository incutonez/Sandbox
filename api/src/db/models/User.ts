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
	declare id: string;

	@Column
	declare first_name: string;

	@Column
	declare last_name: string;

	@Column
	declare phone: string;

	@Column
	declare email: string;

	@Column
	declare gender: string;

	@Column
	declare birth_date: number;

	@ForeignKey(() => Address)
	@Column
	declare address_id?: number;

	@BelongsTo(() => Address)
	address?: Address;
}
