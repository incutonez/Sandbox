<template>
	<article class="flex size-full">
		<nav class="min-w-16 border-r border-r-slate-800 bg-slate-600 p-4">
			<div class="flex flex-col">
				<IconUsers
					class="size-10 cursor-pointer rounded-full fill-green-500 p-2 text-center hover:bg-slate-500"
					title="Users"
					@click="onClickViewUsers"
				/>
				<IconTriforce
					title="Game World Builder"
					class="size-10 cursor-pointer rounded-full p-2 hover:bg-slate-500"
					@click="onClickViewGame"
				/>
				<IconDifference
					title="Differ"
					class="size-10 cursor-pointer rounded-full fill-red-500 p-2 hover:bg-slate-500"
					@click="onClickViewTreeChanges"
				/>
				<IconModeling
					title="Modeling"
					class="w-10 cursor-pointer rounded-full p-2 hover:bg-slate-500"
					@click="onClickViewModeling"
				/>
				<IconEditor
					title="TipTap Editor"
					class="size-10 cursor-pointer rounded-full fill-fuchsia-500 p-2 hover:bg-slate-500"
					@click="onClickViewTipTap"
				/>
			</div>
		</nav>
		<section class="flex size-full flex-1 flex-col overflow-hidden">
			<section class="flex">
				<article class="border-b border-r border-sky-700 bg-sky-200 px-4 py-2">
					Switcher
				</article>
				<article class="flex-1 border-b border-orange-700 bg-orange-200 px-4 py-2">
					User Panel
				</article>
			</section>
			<section class="flex w-full flex-1 overflow-hidden">
				<main class="size-full overflow-hidden">
					<RouterView />
				</main>
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
/**
 * TODOJEF:
 * - Add cell editing to TableGrid
 * - Fix styling for context menu
 * - Add sorting and filtering to the load method
 * - Have remote and local filtering/sorting/paging
 * - Add my own pagination toolbar
 * - Add a custom column menu, which allows to dynamically hide, pin, reset columns
 * - Add global error handling... will need to add something for Axios too, I think
 * - CSV upload that shows grids and errors from API
 * - Add saving of scrollbar for routes (using __name with dynamic caching)
 * - Migrate any individual API dirs to API dir, so we have a centralized API
 * - Add CRUD operations to grids with cell editors
 * - Potentially add provide/inject with TableGrid
 * - Potentially use provide/inject for users.ts data loading
 *
 */
import IconDifference from "@/assets/IconDifference.vue";
import IconEditor from "@/assets/IconEditor.vue";
import IconModeling from "@/assets/IconModeling.vue";
import IconTriforce from "@/assets/IconTriforce.vue";
import IconUsers from "@/assets/IconUsers.vue";
import { viewGameWorldBuilder, viewModeling, viewTipTap, viewTreeChanges, viewUsers } from "@/router";

function onClickViewUsers() {
	viewUsers();
}

function onClickViewGame() {
	viewGameWorldBuilder();
}

function onClickViewTreeChanges() {
	viewTreeChanges();
}

function onClickViewModeling() {
	viewModeling();
}

function onClickViewTipTap() {
	viewTipTap();
}
</script>
