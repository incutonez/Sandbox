import { GetUsers200Response } from "@incutonez/api-spec/dist";
import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Get()
	async getUsers(@Query("start", ParseIntPipe) start: number): Promise<GetUsers200Response> {
		const data = await this.service.getUsers(start);
		return {
			data,
			total: 500,
		};
	}
}
