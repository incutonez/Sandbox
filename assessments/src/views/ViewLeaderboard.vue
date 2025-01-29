<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import { injectMatchRecords } from "@/matchProvider";

const { leaderboard } = injectMatchRecords();
</script>

<template>
	<article class="my-4 flex w-9/10 flex-col items-center">
		<PageHeader
			title="League Standings"
			class="mb-5"
		/>
		<!-- TODO: Abstract to a generic data table component or use external lib -->
		<article class="size-full overflow-auto">
			<table class="table-striped-rows w-full border-collapse">
				<thead>
					<tr>
						<th class="px-4 text-left">
							Team Name
						</th>
						<th class="text-center">
							MP
						</th>
						<th class="md:revert hidden text-center">
							GF
						</th>
						<th class="md:revert hidden text-center">
							GA
						</th>
						<th class="text-center md:hidden">
							GD
						</th>
						<th class="text-center">
							Points
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="team in leaderboard"
						:key="team.teamName"
						class="table-row"
					>
						<td>
							<div class="flex items-center justify-start space-x-3 pl-4">
								<img
									:src="`https://flagsapi.codeaid.io/${team.teamName}.png`"
									style="height: 37px; width: 53px;"
									alt="Team Name Logo"
								>
								<span class="font-semibold">{{ team.teamName }}</span>
							</div>
						</td>
						<td class="text-center text-sm">
							{{ team.matchesPlayed }}
						</td>
						<td class="md:revert hidden text-center text-sm">
							{{ team.goalsFor }}
						</td>
						<td class="md:revert hidden text-center text-sm">
							{{ team.goalsAgainst }}
						</td>
						<td class="text-center text-sm md:hidden">
							{{ team.goalsFor - team.goalsAgainst }}
						</td>
						<td
							class="text-center font-semibold"
							style="color: #025FEB;"
						>
							{{ team.points }}
						</td>
					</tr>
				</tbody>
			</table>
		</article>
	</article>
</template>
