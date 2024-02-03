<template>
	<article class="flex h-full w-full">
		<nav class="min-w-16 border-r border-r-emerald-700 bg-emerald-200 p-4">
			<div class="flex flex-col">
				<IconUsers
					class="h-10 w-10 cursor-pointer rounded-full p-2 text-center hover:bg-yellow-100"
					title="Users"
					@click="onClickViewUsers"
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
				<nav class="h-full w-64 border-r border-red-700 bg-red-200 p-4">
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
import IconUsers from "@/assets/IconUsers.vue";
import { viewUsers } from "@/router.ts";

function onClickViewUsers() {
	viewUsers();
}
</script>
