import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import * as process from "process";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { DBConfig } from "src/db";
import { UsersModule } from "src/users/users.module";

console.log(process.env.NODE_ENV);
@Module({
	imports: [UsersModule, ConfigModule.forRoot(), SequelizeModule.forRoot(DBConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
