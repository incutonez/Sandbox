<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { getAPIVersion, profile } from "@/api";
import IconSchedule from "@/assets/IconSchedule.vue";
import IconSoccer from "@/assets/IconSoccer.vue";
import IconTrophy from "@/assets/IconTrophy.vue";
import { provideMatchRecords } from "@/matchProvider";
import { RouteLeaderboard, RouteSchedule, viewLeaderboard, viewSchedule } from "@/router";

const SelectedCls = "!text-yellow-400 !fill-yellow-400";
const { loadMatches } = provideMatchRecords();
const version = ref();
const route = useRoute();
const scheduleCls = computed(() => route.name === RouteSchedule ? SelectedCls : "");
const leaderboardCls = computed(() => route.name === RouteLeaderboard ? SelectedCls : "");

async function getVersion() {
	version.value = await getAPIVersion();
}

function onClickViewSchedule() {
	viewSchedule();
}

function onClickViewLeaderboard() {
	viewLeaderboard();
}

loadMatches();
getVersion();
</script>

<template>
	<nav class="page-nav">
		<section class="flex">
			<IconSoccer class="mr-1 fill-white" />
			<section class="flex flex-col text-xl font-semibold leading-6 text-white">
				<span>League</span>
				<span>Web UI</span>
			</section>
		</section>
		<section class="flex space-x-10 text-base">
			<div
				class="flex cursor-pointer fill-white text-white hover:fill-blue-200 hover:text-blue-200"
				:class="scheduleCls"
				@click="onClickViewSchedule"
			>
				<IconSchedule class="page-nav-route-logo" />
				<span>Schedule</span>
			</div>
			<div
				class="flex cursor-pointer fill-white text-white hover:fill-blue-200 hover:text-blue-200"
				:class="leaderboardCls"
				@click="onClickViewLeaderboard"
			>
				<IconTrophy class="page-nav-route-logo" />
				<span>Leaderboard</span>
			</div>
		</section>
	</nav>
	<main class="page-content">
		<RouterView />
	</main>
	<footer class="page-footer">
		<span v-if="!!profile">Welcome, {{ profile.name }}!</span>
		<span
			v-show="!!version"
			class="font-semibold"
		>API Version: {{ version }}</span>
	</footer>
</template>

<style scoped lang="postcss">
.page-nav {
  @apply px-10 flex items-center justify-between;
  height: 3.75rem;
  background-color: #025FEB;
}

.page-nav-route-logo {
  @apply mr-2 size-6;
}

.page-content {
  @apply flex-1 flex justify-center w-full overflow-hidden;
}

.page-footer {
  @apply px-10 h-10 flex items-center justify-between;
  background-color: #F6F7F7;
  color: #4B5C68;
}
</style>
