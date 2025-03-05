import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { LeagueMatch } from "src/db/models/LeagueMatch";
import { LeaguesController } from "src/leagues/leagues.controller";
import { LeaguesMapper } from "src/leagues/leagues.mapper";
import { LeaguesService } from "src/leagues/leagues.service";

@Module({
	imports: [SequelizeModule.forFeature([LeagueMatch])],
	controllers: [LeaguesController],
	providers: [LeaguesService, LeaguesMapper, JwtService],
})
export class LeaguesModule {
}
