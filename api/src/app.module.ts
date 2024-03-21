import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "src/accounts/accounts.module";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { DBConfig } from "src/db";
import { UsersModule } from "src/users/users.module";

// TODOJEF: Generate OpenAPI spec using something like this https://docs.nestjs.com/openapi/types-and-parameters
@Module({
	imports: [UsersModule, AccountsModule, ConfigModule.forRoot(), SequelizeModule.forRoot(DBConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
