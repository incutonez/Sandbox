import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/db/models/User";
import { UsersController } from "src/users/users.controller";
import { UsersMapper } from "src/users/users.mapper";
import { UsersService } from "src/users/users.service";

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
	exports: [UsersService],
})
export class UsersModule {}
