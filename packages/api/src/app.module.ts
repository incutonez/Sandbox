import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountsModule } from "@/accounts/accounts.module";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { DBConfig } from "@/db";
import { DiffModule } from "@/diff/diff.module";
import { LeaguesModule } from "@/leagues/leagues.module";
import { RandomModule } from "@/random/random.module";
import { UsersModule } from "@/users/users.module";

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
