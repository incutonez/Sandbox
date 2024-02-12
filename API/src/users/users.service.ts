import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/db/models/User";
import { UsersMapper } from "src/users/users.mapper";

const Max = 20;

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private usersDB: typeof User,
		private readonly mapper: UsersMapper,
	) {}

	async getUsers(start = 0) {
		const response = await this.usersDB.findAll({
			limit: Max,
			offset: start,
			include: [
				{
					all: true,
				},
			],
		});
		return response.map((item) => this.mapper.modelToViewModel(item));
	}
}
