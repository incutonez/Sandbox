import { Injectable } from "@nestjs/common";
import { LeagueMatch } from "src/db/models/LeagueMatch";
import { LeaguesMapper } from "src/leagues/leagues.mapper";

@Injectable()
export class LeaguesService {
	constructor(private mapper: LeaguesMapper) {
	}

	async getMatches() {
		const { rows, count } = await LeagueMatch.findAndCountAll({
			raw: true,
		});
		return {
			data: rows.map((row) => this.mapper.matchToViewModel(row)),
			total: count,
		};
	}
}
