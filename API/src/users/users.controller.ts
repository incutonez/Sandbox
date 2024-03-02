import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
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

	@Put(":userId")
	async updateUser(@Param("userId") userId: string, @Body() body: UserEntity) {
		return this.service.updateUser(body);
	}

	@Delete(":userId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteUser(@Param("userId") userId: string) {
		return this.service.deleteUser(userId);
	}
}
