import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/db/models/User";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { UsersMapper } from "src/users/users.mapper";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private usersDB: typeof User,
		private readonly mapper: UsersMapper,
	) {}

	async getUsers({ start = 0, limit = 20 }: ApiPaginatedRequest) {
		const response = await this.usersDB.findAll({
			limit,
			offset: start,
			include: [
				{
					all: true,
				},
			],
		});
		return response.map((item) => this.mapper.userToViewModel(item));
	}
}
