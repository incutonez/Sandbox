import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "src/accounts/accounts.module";
import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { DBConfig } from "src/db";
import { DiffModule } from "src/diff/diff.module";
import { LeaguesModule } from "src/leagues/leagues.module";
import { RandomModule } from "src/random/random.module";
import { UsersModule } from "src/users/users.module";

@Module({
	imports: [
		UsersModule,
		AccountsModule,
		RandomModule,
		DiffModule,
		LeaguesModule,
		ConfigModule.forRoot({
			envFilePath: [".env.local", ".env"],
		}),
		SequelizeModule.forRoot(DBConfig),
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})
export class AppModule {}
