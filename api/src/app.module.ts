import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "src/accounts/accounts.module";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { DBConfig } from "src/db";
import { DiffModule } from "src/diff/diff.module";
import { RandomModule } from "src/random/random.module";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [
		UsersModule,
		AccountsModule,
		RandomModule,
		DiffModule,
		ConfigModule.forRoot(),
		SequelizeModule.forRoot(DBConfig),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
