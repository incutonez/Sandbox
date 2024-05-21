import { ApiPaginatedRequest, UserEntity, UsersApi } from "@incutonez/spec/dist";
import { Allow, IsInt, IsString } from "class-validator";
import { configuration } from "@/apiConfig";
import { HasAPI } from "@/enums/helper";
import { IsRequired } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";

export const UsersAPI = new UsersApi(configuration);

export class UserModel extends ViewModel implements UserEntity {
	@Allow()
	id = "";

	@IsRequired()
	@IsString()
	firstName = "";

	@IsRequired()
	@IsString()
	lastName = "";

	@IsRequired()
	@IsString()
	email = "";

	@IsString()
	phone?: string;

	@IsInt()
	birthDate?: number;

	@IsString()
	gender?: string;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}

	static async readAll(request: ApiPaginatedRequest) {
		const response = HasAPI
			? await UsersAPI.listUsers(request)
			: {
				data: [],
			};
		return super._readAll(response.data);
	}

	async read(userId = this.id) {
		const response = await UsersAPI.getUser(userId);
		return response.data;
	}

	async create() {
		const response = await UsersAPI.createUser(this.get());
		return response.data;
	}

	async update() {
		const response = await UsersAPI.updateUser(this.id, this.get());
		return response.data;
	}

	async delete() {
		await UsersAPI.deleteUser(this.id);
	}

	async copy() {
		const response = await UsersAPI.copyUser(this.id);
		return response.data;
	}
}
