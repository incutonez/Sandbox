import { DataTypes } from "sequelize";
import { Column } from "sequelize-typescript";

export function PrimaryKeyGuid() {
	return Column({
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false,
	});
}
