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
			raw: true,
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

	async getUser(userId: string) {
		const response = await User.findOne({
			raw: true,
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

	async createUser(user: UserEntity) {
		const response = await User.create(this.mapper.viewModelToUser(user));
		return this.mapper.userToViewModel(response);
	}

	async createUsers(users: UserEntity[]) {
		return Promise.all(users.map((user) => this.createUser(user)));
	}

	async copyUser(userId: string) {
		const user = await this.getUser(userId);
		delete user.id;
		user.lastName += " Copy";
		return this.createUser(user);
	}

	async updateUser(user: UserEntity) {
		await User.update(this.mapper.viewModelToUser(user), {
			where: {
				id: user.id,
			},
			returning: true,
		});
		return this.getUser(user.id);
	}

	async deleteUser(id: string) {
		await User.destroy({
			where: {
				id,
			},
		});
	}
}
