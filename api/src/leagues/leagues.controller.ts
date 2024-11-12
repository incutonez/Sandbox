import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LeaguesService } from "src/leagues/leagues.service";
import { LeagueMatchResponseModel } from "src/models/responses.entity";

@ApiTags("leagues")
@Controller("leagues")
export class LeaguesController {
	constructor(private readonly service: LeaguesService) {
	}

	@Get("matches")
	async getMatches(): Promise<LeagueMatchResponseModel> {
		return this.service.getMatches();
	}
}
