import { createRouter, createWebHashHistory } from "vue-router";
import ViewUser from "@/views/ViewUser.vue";
import ViewUsers from "@/views/ViewUsers.vue";

export const RouteUsers = "users";
export const RouteUsersView = "users-view";

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

export function viewUser(userId: number) {
	return router.push({
		name: RouteUsersView,
		params: {
			userId,
		},
	});
}
