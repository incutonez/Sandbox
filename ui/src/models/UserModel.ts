import { toRaw } from "vue";
import { faker } from "@faker-js/faker";
import { ApiPaginatedRequest, UserEntity, UsersApi } from "@incutonez/spec/dist";
import { Allow, IsInt, IsString } from "class-validator";
import { configuration } from "@/apiConfig";
import { HasAPI } from "@/enums/helper";
import { AddressModel } from "@/models/AddressModel";
import { IsRequired, ModelTransform } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { removeItem } from "@/utils/common";

export const UsersAPI = new UsersApi(configuration);

const LocalUsers: UserModel[] = [];

async function importUsers(request: UserModel[]) {
	// TODOJEF: ALLOW LOCAL MODE
	console.log("here", request);
	return UsersAPI.createUsers(request.map((user) => user.get()));
}

async function loadUsers(request: ApiPaginatedRequest) {
	if (HasAPI) {
		return UsersAPI.listUsers(request);
	}
	for (let i = request.start; i < request.limit + request.start; i++) {
		LocalUsers[i] ??= UserModel.create({
			id: faker.string.uuid(),
			firstName: faker.person.firstName(),
			lastName: faker.person.lastName(),
			email: faker.internet.email(),
			phone: faker.phone.number(),
			birthDate: faker.date.birthdate().getTime(),
			gender: faker.person.gender(),
		});
	}
	return {
		data: {
			total: LocalUsers.length < 500 ? 500 : LocalUsers.length,
			data: LocalUsers.slice(request.start, request.start + request.limit),
		},
	};
}

async function loadUser(userId: string) {
	if (HasAPI) {
		return UsersAPI.getUser(userId);
	}
	return {
		data: LocalUsers.find((user) => user?.id === userId),
	};
}

async function createUser(user: UserModel) {
	if (HasAPI) {
		return UsersAPI.createUser(user.get());
	}
	LocalUsers.push(user);
	user.id = faker.string.uuid();
	return {
		data: user.get(),
	};
}

async function updateUser(user: UserModel) {
	if (HasAPI) {
		return UsersAPI.updateUser(user.id!, user.get());
	}
	const found = LocalUsers.find((item) => item?.id === user.id);
	if (found) {
		found.set(user.get());
	}
	return {
		data: found?.get(),
	};
}

async function deleteUser(user: UserModel) {
	if (HasAPI) {
		return UsersAPI.deleteUser(user.id!);
	}
	removeItem(LocalUsers, toRaw(user));
}

async function copyUser(user: UserModel) {
	if (HasAPI) {
		return UsersAPI.copyUser(user.id!);
	}
	const clone = user.clone();
	clone.id = faker.string.uuid();
	LocalUsers.push(clone);
	return {
		data: clone,
	};
}

export interface IUserCSV {
	"First Name": string;
	"Last Name": string;
	Email: string;
	Phone: string;
	"Birth Date": string;
	Gender: string;
}

export class UserModel extends ViewModel implements UserEntity {
	@Allow()
	id?: string;

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

	@ModelTransform(() => AddressModel)
	address?: AddressModel;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}

	static async readAll(request: ApiPaginatedRequest) {
		const response = await loadUsers(request);
		return super._readAll(response.data);
	}

	static async bulk(users: UserModel[]) {
		const { data } = await importUsers(users);
		return data;
	}

	async read(userId = this.id) {
		const { data } = await loadUser(userId!);
		return data;
	}

	async create() {
		const { data } = await createUser(this);
		return data;
	}

	async update() {
		const { data } = await updateUser(this);
		return data;
	}

	async delete() {
		await deleteUser(this);
	}

	async copy() {
		const { data } = await copyUser(this);
		return data;
	}
}
