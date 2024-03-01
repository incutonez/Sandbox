import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiPaginatedRequest, ApiPaginatedResponse, ResponseListEntity } from "src/models/base.list.entity";
import { UserEntity } from "src/models/user.entity";
import { UsersService } from "src/users/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly service: UsersService) {}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	@ApiPaginatedResponse(UserEntity)
	async listUsers(@Body() body: ApiPaginatedRequest): Promise<ResponseListEntity> {
		return this.service.listUsers(body);
	}

	@Get(":userId")
	async getUser(@Param("userId") userId: string) {
		return this.service.getUser(userId);
	}

	@Post()
	async createUser(@Body() body: UserEntity) {
		return this.service.createUser(body);
	}
}
