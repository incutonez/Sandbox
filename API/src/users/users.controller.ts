import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiPaginatedRequest, ApiPaginatedResponse, ResponseListEntity } from "src/models/base.list.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Get()
	@ApiPaginatedResponse(UserEntity)
	async getUsers(@Query() query: ApiPaginatedRequest): Promise<ResponseListEntity> {
		const data = await this.service.getUsers(query);
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
