import { createRouter, createWebHashHistory } from "vue-router";
import ViewUser from "@/views/ViewUser.vue";
import ViewUsers from "@/views/ViewUsers.vue";

const RouteNew = "create";
export const RouteUsers = "users";
export const RouteUsersView = "users-view";
export const RouteUsersNew = "users-new";

export const routes = [
	{
		path: "/users",
		name: RouteUsers,
		component: ViewUsers,
		children: [
			{
				path: ":userId",
				name: RouteUsersView,
				component: ViewUser,
				props: true,
			},
			{
				path: RouteNew,
				name: RouteUsersNew,
				component: ViewUser,
			},
		],
	},
];

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
