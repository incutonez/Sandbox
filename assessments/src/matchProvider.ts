import { inject, InjectionKey, provide, ref } from "vue";
import { getAllMatches } from "@/api";
import { LeagueMatch, LeagueTeam, newLeaderboard, sortLeaderboard } from "@/api/LeagueService";

type TMatchProvider = ReturnType<typeof provideMatchRecords>;
const MatchRecordsKey: InjectionKey<TMatchProvider> = Symbol("matchRecords");

export function provideMatchRecords() {
	const matches = ref<LeagueMatch[]>([]);
	const leaderboard = ref<LeagueTeam[]>([]);
	const provider = {
		matches,
		leaderboard,
		loadMatches,
	};

	async function loadMatches() {
		matches.value = await getAllMatches();
		leaderboard.value = newLeaderboard(matches.value);
		sortLeaderboard(leaderboard.value, matches.value);
	}

	provide(MatchRecordsKey, provider);
	return provider;
}

export function injectMatchRecords() {
	return inject(MatchRecordsKey) as TMatchProvider;
}
