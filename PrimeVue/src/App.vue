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
						<BaseDataTable :records="Data">
							<Column
								field="first_name"
								header="First Name"
							/>
							<Column
								field="last_name"
								header="Last Name"
							/>
							<Column
								field="email"
								header="Email"
							/>
							<Column
								field="gender"
								header="Gender"
							/>
							<Column
								field="ip_address"
								header="IP Address"
							/>
							<Column
								field="ip_address"
								header="IP Address"
							/>
							<Column
								field="ip_address"
								header="IP Address"
							/>
							<Column
								field="ip_address"
								header="IP Address"
							/>
						</BaseDataTable>
					</section>
				</main>
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
import Column from "primevue/column";
import BaseDataTable from "@/components/BaseDataTable.vue";
import Data from "./MOCK_DATA.json";
</script>
