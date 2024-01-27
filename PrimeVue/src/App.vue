<template>
	<article class="flex h-full w-full">
		<nav class="w-16 border-r border-r-emerald-700 bg-emerald-200 p-4">
			<div class="writing-mode-vertical">
				Side Panel!
			</div>
		</nav>
		<section class="flex flex-1 flex-col overflow-hidden w-full h-full">
			<section class="flex">
				<article class="border-b border-r border-sky-700 bg-sky-200 px-4 py-2">
					Switcher
				</article>
				<article class="flex-1 border-b border-orange-700 bg-orange-200 px-4 py-2">
					User Panel
				</article>
			</section>
			<section class="flex flex-1 w-full overflow-hidden">
				<nav class="h-full w-64 border-r border-red-700 bg-red-200 p-4">
					Nav
				</nav>
				<main class="h-full w-full overflow-hidden">
					<section class="h-full w-full">
						<GridTable :records="Data">
							<GridColumn
								field="first_name"
								header="First Name"
							/>
							<GridColumn
								field="last_name"
								header="Last Name"
							/>
							<GridColumn
								field="email"
								header="Email"
							/>
							<GridColumn
								field="gender"
								header="Gender"
							/>
							<GridColumn
								field="ip_address"
								header="IP Address"
							/>
							<GridColumn
								field="ip_address"
								header="IP Address"
							/>
							<GridColumn
								field="ip_address"
								header="IP Address"
							/>
							<GridColumn
								field="ip_address"
								header="IP Address"
							/>
						</GridTable>
					</section>
				</main>
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
import GridColumn from "primevue/column";
import GridTable from "@/components/GridTable.vue";
import Data from "./MOCK_DATA.json";
</script>
