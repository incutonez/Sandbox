<template>
	<article class="flex h-full w-full">
		<nav class="min-w-16 border-r border-r-slate-800 bg-slate-600 p-4">
			<div class="flex flex-col">
				<IconUsers
					class="h-10 w-10 cursor-pointer rounded-full fill-green-500 p-2 text-center hover:bg-slate-500"
					title="Users"
					@click="onClickViewUsers"
				/>
				<IconTriforce
					title="Zelda World Builder"
					class="h-10 w-10 cursor-pointer rounded-full p-2 hover:bg-slate-500"
					@click="onClickViewZelda"
				/>
			</div>
		</nav>
		<section class="flex h-full w-full flex-1 flex-col overflow-hidden">
			<section class="flex">
				<article class="border-b border-r border-sky-700 bg-sky-200 px-4 py-2">
					Switcher
				</article>
				<article class="flex-1 border-b border-orange-700 bg-orange-200 px-4 py-2">
					User Panel
				</article>
			</section>
			<section class="flex w-full flex-1 overflow-hidden">
				<nav
					v-if="route.meta.showNav !== false"
					class="h-full w-64 border-r border-red-700 bg-red-200 p-4"
				>
					Nav
				</nav>
				<main class="h-full w-full overflow-hidden">
					<RouterView />
				</main>
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
/**
 * TODOJEF:
 * - Add TypeScript checker on PRs
 * - Fix styling for context menu
 * - Add sorting and filtering to the load method
 * - Have remote and local filtering/sorting/paging
 * - Add my own pagination toolbar
 * - Add a custom column menu, which allows to dynamically hide, pin, reset columns
 * - Add global error handling
 * - CSV upload that shows grids and errors from API
 * - Add saving of scrollbar for routes (using __name with dynamic caching)
 * - Add vue-tsc-files for TS linting on commit
 * - Migrate any individual API dirs to API dir, so we have a centralized API
 * - Add class validator
 * - Add CRUD operations to grids with cell editors
 * - Potentially add provide/inject with GridTable
 * - Potentially use provide/inject for users.ts data loading
 */
import { useRoute } from "vue-router";
import IconTriforce from "@/assets/IconTriforce.vue";
import IconUsers from "@/assets/IconUsers.vue";
import { viewUsers, viewZeldaWorldBuilder } from "@/router";

const route = useRoute();

function onClickViewUsers() {
	viewUsers();
}

function onClickViewZelda() {
	viewZeldaWorldBuilder();
}
</script>
