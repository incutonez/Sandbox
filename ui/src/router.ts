import { createRouter, createWebHashHistory } from "vue-router";
import ViewTreeChanges from "@/views/ViewTreeChanges.vue";
import ViewUser from "@/views/ViewUser.vue";
import ViewUsers from "@/views/ViewUsers.vue";
import ViewZeldaWorldBuilder from "@/views/ViewZeldaWorldBuilder.vue";

const RouteNew = "create";

export const RouteUsers = "users";

export const RouteUsersView = "users-view";

export const RouteUsersNew = "users-new";

export const RouteZeldaWorldBuilder = "zelda-world-builder";

export const RouteTreeChangesView = "tree-changes-view";

export const routes = [{
	path: "/users",
	name: RouteUsers,
	component: ViewUsers,
	children: [{
		path: ":userId",
		name: RouteUsersView,
		component: ViewUser,
		props: true,
	}, {
		path: RouteNew,
		name: RouteUsersNew,
		component: ViewUser,
	}],
}, {
	path: "/treechanges",
	name: RouteTreeChangesView,
	component: ViewTreeChanges,
}, {
	path: "/zelda",
	name: RouteZeldaWorldBuilder,
	component: ViewZeldaWorldBuilder,
	meta: {
		showNav: false,
	},
}];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export function viewUsers() {
	return router.push({
		name: RouteUsers,
	});
}

export function viewUser(userId?: string) {
	return router.push({
		name: userId ? RouteUsersView : RouteUsersNew,
		params: {
			userId,
		},
	});
}

export function viewZeldaWorldBuilder() {
	return router.push({
		name: RouteZeldaWorldBuilder,
	});
}

export function viewTreeChanges() {
	return router.push({
		name: RouteTreeChangesView,
	});
}
