import { createRouter, createWebHashHistory } from "vue-router";
import ViewUsers from "@/views/ViewUsers.vue";

export const RouteUsers = "users";

export const routes = [
	{
		path: "/users",
		children: [
			{
				path: "",
				name: RouteUsers,
				component: ViewUsers,
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
