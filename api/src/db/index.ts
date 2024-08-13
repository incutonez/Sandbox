import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Address } from "src/db/models/Address";
import { LeagueMatch } from "src/db/models/LeagueMatch";
import { User } from "src/db/models/User";

export const DBConfig: SequelizeModuleOptions = {
	dialect: "sqlite",
	storage: "src/db/data.db",
	host: "localhost",
	models: [User, Address, LeagueMatch],
};
