import { LeagueMatch } from "src/db/models/LeagueMatch";
import { LeagueMatchEntity } from "src/models/league.match.entity";

export class LeaguesMapper {
	matchToViewModel(leagueMatch: LeagueMatch): LeagueMatchEntity {
		return {
			id: leagueMatch.id,
			groupId: leagueMatch.group_id,
			stadium: leagueMatch.stadium,
			matchDate: leagueMatch.match_date,
			matchPlayed: leagueMatch.match_played,
			homeTeam: leagueMatch.home_team,
			homeTeamScore: leagueMatch.home_team_score,
			awayTeam: leagueMatch.away_team,
			awayTeamScore: leagueMatch.away_team_score,
		};
	}
}
