import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { User } from "src/db/models/User";
import { whereSearch } from "src/db/query";
import { EnumFilterType } from "src/enums.entity";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { UsersMapper } from "src/users/users.mapper";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private usersDB: typeof User,
		private readonly mapper: UsersMapper,
	) {}

	async listUsers({ start = 0, limit = 20, filters = [] }: ApiPaginatedRequest) {
		const query: FindOptions<User> = {
			limit,
			offset: start,
			include: [
				{
					all: true,
				},
			],
		};
		filters.forEach(({ type, value }) => {
			if (type === EnumFilterType.Search) {
				query.where = whereSearch<User>(["first_name", "last_name", "phone", "email", "gender", "birth_date"], value);
			}
		});
		const { rows, count } = await this.usersDB.findAndCountAll(query);
		return {
			data: rows.map((item) => this.mapper.userToViewModel(item)),
			total: count,
		};
	}

	async getUser(userId: string) {
		const response = await this.usersDB.findOne({
			where: {
				id: userId,
			},
			include: [
				{
					all: true,
				},
			],
		});
		return this.mapper.userToViewModel(response);
	}
}
