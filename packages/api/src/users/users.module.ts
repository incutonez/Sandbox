import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "@/db/models/User";
import { UsersController } from "@/users/users.controller";
import { UsersMapper } from "@/users/users.mapper";
import { UsersService } from "@/users/users.service";

@Module({
	imports: [SequelizeModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService, UsersMapper],
})
export class UsersModule {}
