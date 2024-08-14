import { createRouter, createWebHashHistory } from "vue-router";
import ViewLeaderboard from "@/views/ViewLeaderboard.vue";
import ViewNotFound from "@/views/ViewNotFound.vue";
import ViewSchedule from "@/views/ViewSchedule.vue";

export const RouteSchedule = "schedule";

export const RouteLeaderboard = "leaderboard";

export const RouteNotFound = "not-found";

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [{
		path: "/",
		redirect: {
			name: RouteSchedule,
			replace: true,
		},
	}, {
		path: "/leaderboard",
		name: RouteLeaderboard,
		component: ViewLeaderboard,
	}, {
		path: "/schedule",
		name: RouteSchedule,
		component: ViewSchedule,
	}, {
		path: "/:catchAll(.*)",
		name: RouteNotFound,
		component: ViewNotFound,
	}],
});

export function viewSchedule() {
	return router.push({
		name: RouteSchedule,
	});
}

export function viewLeaderboard() {
	return router.push({
		name: RouteLeaderboard,
	});
}
