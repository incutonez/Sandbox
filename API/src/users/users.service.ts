import { Injectable } from "@nestjs/common";
import { FindOptions } from "sequelize";
import { User } from "src/db/models/User";
import { whereSearch } from "src/db/query";
import { EnumFilterType } from "src/enums.entity";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersMapper } from "src/users/users.mapper";

@Injectable()
export class UsersService {
	constructor(private readonly mapper: UsersMapper) {}

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
		const { rows, count } = await User.findAndCountAll(query);
		return {
			data: rows.map((item) => this.mapper.userToViewModel(item)),
			total: count,
		};
	}

	async createUser(user: UserEntity) {
		const response = await User.create(this.mapper.viewModelToUser(user));
		return this.mapper.userToViewModel(response);
	}

	async getUser(userId: string) {
		const response = await User.findOne({
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
