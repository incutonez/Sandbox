import { Module } from "@nestjs/common";
import { UsersController } from "src/users.controller";
import { UsersService } from "src/users.service";

@Module({
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
