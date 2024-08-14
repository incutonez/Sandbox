type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeys<T> = {
	[P in keyof T]-?:
	IfEquals<
		{ [Q in P]: T[P] },
		{ -readonly [Q in P]: T[P] },
		P
	>
}[keyof T];

export type ModelInterface<T> = {
	// We need to map over the keys directly to preserve optionality. We filter with "as"
	// Exclude undefined from the check to properly handle optional properties
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T as T[K] extends Function ? never : K extends Symbol ? never : K]: Exclude<T[K], undefined> extends Array<infer E> ? Array<ModelInterface<E>> : Exclude<T[K], undefined> extends Record<string, never> ? ModelInterface<T[K]> : T[K];
};

/**
 * The types above are a little confusing... we want to remove getters and setters, and that seems only
 * doable by using IfEquals and WritableKeys, which unfortunately removes all readonly properties (might be okay though).
 * We also want to exclude functions and symbols, so that's why we use ModelInterface when defining IViewModel.
 * Source:
 * - https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir
 * - https://github.com/microsoft/TypeScript/issues/42896#issuecomment-782754005
 */
export type IClass<T> = Pick<T, WritableKeys<ModelInterface<T>>>;

export class LeagueTeam {
    teamName: string;
    matchesPlayed: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;

    constructor(data: Partial<IClass<LeagueTeam>>) {
    	this.teamName = data.teamName ?? "";
    	this.matchesPlayed = data.matchesPlayed ?? 0;
    	this.goalsFor = data.goalsFor ?? 0;
    	this.goalsAgainst = data.goalsAgainst ?? 0;
    	this.points = data.points ?? 0;
    }
}

export class LeagueMatch {
    matchDate: number;
    stadium: string;
    homeTeam: string;
    awayTeam: string;
    matchPlayed: boolean;
    homeTeamScore: number;
    awayTeamScore: number;

    constructor(data: Partial<IClass<LeagueMatch>>) {
    	this.matchDate = data.matchDate ?? 0;
    	this.stadium = data.stadium ?? "";
    	this.homeTeam = data.homeTeam ?? "";
    	this.awayTeam = data.awayTeam ?? "";
    	this.matchPlayed = data.matchPlayed ?? false;
    	this.homeTeamScore = data.homeTeamScore ?? 0;
    	this.awayTeamScore = data.awayTeamScore ?? 0;
    }
}

export function newLeaderboard(matches: LeagueMatch[]) {
	const leaderboard: LeagueTeam[] = [];
	const teams: Record<string, LeagueTeam> = {};
	for (const match of matches) {
		if (!match.matchPlayed) {
			continue;
		}
		const { homeTeam, awayTeam, homeTeamScore, awayTeamScore } = match;
		let home = teams[homeTeam];
		let away = teams[awayTeam];
		if (!home) {
			home = teams[homeTeam] = new LeagueTeam({
				teamName: homeTeam,
			});
			leaderboard.push(home);
		}
		if (!away) {
			away = teams[awayTeam] = new LeagueTeam({
				teamName: awayTeam,
			});
			leaderboard.push(away);
		}
		home.matchesPlayed++;
		away.matchesPlayed++;
		home.goalsFor += homeTeamScore;
		home.goalsAgainst += awayTeamScore;
		away.goalsFor += awayTeamScore;
		away.goalsAgainst += homeTeamScore;
		if (homeTeamScore === awayTeamScore) {
			home.points += 1;
			away.points += 1;
		}
		else if (homeTeamScore < awayTeamScore) {
			away.points += 3;
		}
		else {
			home.points += 3;
		}
	}
	return leaderboard;
}

export function sortLeaderboardMini(lhs: LeagueTeam, rhs: LeagueTeam, matches: LeagueMatch[]) {
	let lhsScore = 0;
	let rhsScore = 0;
	const { teamName: lhsName, goalsFor: lhsGoals, points: lhsPoints } = lhs;
	const { teamName: rhsName, goalsFor: rhsGoals, points: rhsPoints } = rhs;
	if (lhsPoints > rhsPoints) {
		return -1;
	}
	else if (rhsPoints > lhsPoints) {
		return 1;
	}
	const lhsGoalDifference = lhsGoals - lhs.goalsAgainst;
	const rhsGoalDifference = rhsGoals - rhs.goalsAgainst;
	const teams = [lhsName, rhsName];
	matches.forEach(({ homeTeam, homeTeamScore, awayTeam, awayTeamScore }) => {
		if (teams.includes(homeTeam) && teams.includes(awayTeam)) {
			if (homeTeam === lhsName) {
				lhsScore += homeTeamScore;
			}
			else if (awayTeam === lhsName) {
				lhsScore += awayTeamScore;
			}
			else if (homeTeam === rhsName) {
				rhsScore += homeTeamScore;
			}
			else {
				rhsScore += awayTeamScore;
			}
		}
	});
	if (lhsScore > rhsScore) {
		return -1;
	}
	else if (rhsScore > lhsScore) {
		return 1;
	}
	else if (lhsGoalDifference > rhsGoalDifference) {
		return -1;
	}
	else if (rhsGoalDifference > lhsGoalDifference) {
		return 1;
	}
	else if (lhsGoals > rhsGoals) {
		return -1;
	}
	else if (rhsGoals > lhsGoals) {
		return 1;
	}
	return lhsName.localeCompare(rhsName, "en", {
		sensitivity: "base",
	});
}

export function sortLeaderboard(leaderboard: LeagueTeam[], allMatches: LeagueMatch[]) {
	let miniLeaderboard: LeagueTeam[];
	leaderboard.sort((lhs, rhs) => {
		const { points: lhsPoints, teamName: lhsName } = lhs;
		const { points: rhsPoints, teamName: rhsName } = rhs;
		if (lhsPoints === rhsPoints) {
			const teams: string[] = [];
			leaderboard.forEach(({ points, teamName }) => {
				if (points === lhsPoints) {
					teams.push(teamName);
				}
			});
			// If we have 2 teams, no need for a mini leaderboard, as we can check the other metrics
			if (teams.length === 2) {
				return sortLeaderboardMini(lhs, rhs, allMatches);
			}
			else {
				// Find all teams with the same points
				const matches = allMatches.filter(({ homeTeam, awayTeam }) => teams.includes(homeTeam) && teams.includes(awayTeam));
				if (!miniLeaderboard) {
					miniLeaderboard = newLeaderboard(matches);
					// Sort based on our metrics, which includes points from the newly generated leaderboard
					miniLeaderboard.sort((lhs, rhs) => sortLeaderboardMini(lhs, rhs, matches));
				}
				let lhsIndex = 0;
				let rhsIndex = 0;
				// Simply use the indices, as they should be sorted appropriately now
				for (const [index, team] of miniLeaderboard.entries()) {
					if (team.teamName === lhsName) {
						lhsIndex = index;
					}
					else if (team.teamName === rhsName) {
						rhsIndex = index;
					}
				}
				return lhsIndex < rhsIndex ? -1 : 1;
			}
		}
		return lhsPoints > rhsPoints ? -1 : 1;
	});
}
