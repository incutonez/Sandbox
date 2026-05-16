import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { LeagueMatch } from "@/db/models/LeagueMatch";
import { LeaguesController } from "@/leagues/leagues.controller";
import { LeaguesMapper } from "@/leagues/leagues.mapper";
import { LeaguesService } from "@/leagues/leagues.service";

@Module({
	imports: [SequelizeModule.forFeature([LeagueMatch])],
	controllers: [LeaguesController],
	providers: [LeaguesService, LeaguesMapper, JwtService],
})
export class LeaguesModule {
}
