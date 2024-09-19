import { createRouter, createWebHashHistory } from "vue-router";
import ViewClassValidator from "@/views/modeling/ViewClassValidator.vue";
import ViewTypeBox from "@/views/modeling/ViewTypeBox.vue";
import ViewZod from "@/views/modeling/ViewZod.vue";
import DialogImport from "@/views/users/DialogImport.vue";
import ViewAuditor from "@/views/ViewAuditor.vue";
import ViewGameWorldBuilder from "@/views/ViewGameWorldBuilder.vue";
import ViewModeling from "@/views/ViewModeling.vue";
import ViewTipTap from "@/views/ViewTipTap.vue";
import ViewUser from "@/views/ViewUser.vue";
import ViewUsers from "@/views/ViewUsers.vue";

const RouteNew = "create";

export const RouteUsers = "users";

export const RouteUsersImport = "users-import";

export const RouteUsersView = "users-view";

export const RouteUsersNew = "users-new";

export const RouteGameWorldBuilder = "game-world-builder";

export const RouteTipTap = "tip-tap";

export const RouteAuditorView = "auditor-view";

export const RouteModelingView = "modeling-view";

export const RouteModelingClassValidatorView = "modeling-class-validator-view";

export const RouteModelingTypeBoxView = "modeling-typebox-view";

export const RouteModelingZodView = "modeling-zod-view";

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
	}, {
		path: "import",
		name: RouteUsersImport,
		component: DialogImport,
		props: {
			modelValue: true,
		},
	}],
}, {
	path: "/auditor",
	name: RouteAuditorView,
	component: ViewAuditor,
	meta: {
		showNav: false,
	},
}, {
	path: "/modeling",
	name: RouteModelingView,
	component: ViewModeling,
	redirect: {
		name: RouteModelingClassValidatorView,
	},
	children: [{
		path: "classValidator",
		name: RouteModelingClassValidatorView,
		component: ViewClassValidator,
	}, {
		path: "typebox",
		name: RouteModelingTypeBoxView,
		component: ViewTypeBox,
	}, {
		path: "zod",
		name: RouteModelingZodView,
		component: ViewZod,
	}],
}, {
	path: "/tipTap",
	name: RouteTipTap,
	component: ViewTipTap,
}, {
	path: "/game",
	name: RouteGameWorldBuilder,
	component: ViewGameWorldBuilder,
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

export function viewUsersImport() {
	return router.push({
		name: RouteUsersImport,
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

export function viewGameWorldBuilder() {
	return router.push({
		name: RouteGameWorldBuilder,
	});
}

export function viewTreeChanges() {
	return router.push({
		name: RouteAuditorView,
	});
}

export function viewTipTap() {
	return router.push({
		name: RouteTipTap,
	});
}

export function viewModeling() {
	return router.push({
		name: RouteModelingView,
	});
}

export function viewClassValidator() {
	return router.push({
		name: RouteModelingClassValidatorView,
	});
}

export function viewTypeBox() {
	return router.push({
		name: RouteModelingTypeBoxView,
	});
}

export function viewZod() {
	return router.push({
		name: RouteModelingZodView,
	});
}
