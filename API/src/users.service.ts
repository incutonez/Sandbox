import { IUserDetail } from "@incutonez/api-spec/dist";
import { Injectable } from "@nestjs/common";
import users from "src/users.json";

const Max = 20;

@Injectable()
export class UsersService {
	getUsers(start = 0) {
		const data: IUserDetail[] = [];
		for (let i = start; i < start + Max; i++) {
			data.push(users[i]);
		}
		return data;
	}
}
