<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { injectMatchRecords } from "@/matchProvider";
import { formatDate, formatTime } from "@/utils";

const { matches } = injectMatchRecords();
</script>

<template>
	<article class="my-4 flex w-90 flex-col items-center">
		<PageHeader
			title="League Schedule"
			class="mb-5"
		/>
		<!-- TODO: Abstract to a generic data table component or use external lib -->
		<article class="size-full overflow-auto">
			<table class="table-striped-rows w-full border-collapse">
				<tr>
					<th class="md:revert hidden px-4 text-left">
						Date/Time
					</th>
					<th class="lg:revert hidden text-left">
						Stadium
					</th>
					<th class="text-right">
						Home Team
					</th>
					<th class="text-center" />
					<th class="text-left">
						Away Team
					</th>
				</tr>
				<tr
					v-for="match in matches"
					:key="`${match.matchDate}_${match.stadium}`"
					class="table-row"
				>
					<td class="md:revert hidden w-32 px-4 text-sm">
						<div class="flex max-w-min flex-col text-right">
							<span>{{ formatDate(match.matchDate) }}</span>
							<span>{{ formatTime(match.matchDate) }}</span>
						</div>
					</td>
					<td class="lg:revert hidden text-sm">
						{{ match.stadium }}
					</td>
					<td>
						<div class="flex items-center justify-end space-x-3">
							<span class="font-semibold">{{ match.homeTeam }}</span>
							<img
								:src="`https://flagsapi.codeaid.io/${match.homeTeam}.png`"
								style="height: 37px; width: 53px;"
								alt="Home Team Logo"
							>
						</div>
					</td>
					<td class="text-center font-semibold">
						<template v-if="match.matchPlayed">
							{{ match.homeTeamScore }} : {{ match.awayTeamScore }}
						</template>
						<template v-else>
							- : -
						</template>
					</td>
					<td>
						<div class="flex items-center justify-start space-x-3">
							<img
								:src="`https://flagsapi.codeaid.io/${match.awayTeam}.png`"
								style="height: 37px; width: 53px;"
								alt="Away Team Logo"
							>
							<span class="font-semibold">{{ match.awayTeam }}</span>
						</div>
					</td>
				</tr>
			</table>
		</article>
	</article>
</template>
