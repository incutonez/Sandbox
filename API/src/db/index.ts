import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Address } from "src/db/models/Address";
import { User } from "src/db/models/User";

export const DBConfig: SequelizeModuleOptions = {
	dialect: "sqlite",
	storage: "db/data.db",
	host: "localhost",
	models: [User, Address],
};
