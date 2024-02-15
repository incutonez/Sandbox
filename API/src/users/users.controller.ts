import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiPaginatedResponse, ResponseListEntity } from "src/models/response.list.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Get()
	@ApiPaginatedResponse(UserEntity)
	async getUsers(@Query("start", ParseIntPipe) start: number): Promise<ResponseListEntity> {
		const data = await this.service.getUsers(start);
		return {
			data,
			total: 500,
		};
	}

	// @Post()
	// async createUser(@Body() body: UserEntity) {
	//
	// }
}
