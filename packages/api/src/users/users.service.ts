import { Injectable } from "@nestjs/common";
import { FindOptions } from "sequelize";
import ValidationError from "sequelize/lib/errors/validation-error";
import { User } from "@/db/models/User";
import { whereSearch } from "@/db/query";
import { EnumFilterType } from "@/enums.entity";
import { ApiPaginatedRequest } from "@/models/base.list.entity";
import { BulkResponse } from "@/models/responses.entity";
import { UserEntity } from "@/models/user.entity";
import { UsersMapper } from "@/users/users.mapper";

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
		const response = await User.findByPk(userId, {
			raw: true,
			include: [{
				all: true,
			}],
		});

		return response ? this.mapper.userToViewModel(response) : undefined;
	}

	async createUser(user: UserEntity) {
		const response = await User.create(this.mapper.viewModelToUser(user));

		return this.mapper.userToViewModel(response);
	}

	async createUsers(users: UserEntity[]) {
		const errors: BulkResponse[] = [];
		await Promise.all(users.map(async (user, index) => {
			try {
				await this.createUser(user);
			}
			catch (ex) {
				if (ex instanceof ValidationError) {
					errors.push({
						index,
						message: ex.errors.map(({ message }) => message),
					});
				}
			}
		}));

		return errors;
	}

	async copyUser(userId: string) {
		const user = await this.getUser(userId);
		if (user) {
			delete user.id;
			user.lastName += " Copy";

			return this.createUser(user);
		}
	}

	async updateUser(user: UserEntity) {
		if (user.id) {
			await User.update(this.mapper.viewModelToUser(user), {
				where: {
					id: user.id,
				},
				returning: true,
			});

			return this.getUser(user.id);
		}
	}

	async deleteUser(id: string) {
		await User.destroy({
			where: {
				id,
			},
		});
	}
}
