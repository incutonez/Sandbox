import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@/auth.guard";
import { LeaguesService } from "@/leagues/leagues.service";
import { LeagueMatchResponseModel } from "@/models/responses.entity";

@ApiTags("leagues")
@Controller("leagues")
export class LeaguesController {
	constructor(private readonly service: LeaguesService) {
	}

	@UseGuards(AuthGuard)
	@Get("matches")
	async getMatches(): Promise<LeagueMatchResponseModel> {
		return this.service.getMatches();
	}
}
