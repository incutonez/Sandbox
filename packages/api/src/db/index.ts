import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { Address } from "@/db/models/Address";
import { LeagueMatch } from "@/db/models/LeagueMatch";
import { User } from "@/db/models/User";

export const DBConfig: SequelizeModuleOptions = {
	dialect: "sqlite",
	storage: "@/db/data.db",
	host: "localhost",
	models: [User, Address, LeagueMatch],
};
