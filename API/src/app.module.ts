import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { DBConfig } from "src/db";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [UsersModule, ConfigModule.forRoot(), SequelizeModule.forRoot(DBConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
