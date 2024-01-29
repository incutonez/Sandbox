<template>
	<TableColumn v-bind="getColumnProps(props)">
		<!-- Expose all slots from parent component -->
		<template
			v-for="(_, slot) of $slots"
			#[slot]="scope"
		>
			<slot
				:name="slot as keyof typeof slots"
				v-bind="scope ?? {}"
			/>
		</template>
	</TableColumn>
</template>

<script setup lang="ts">
/**
 * We can't create a custom wrapper column component yet.  Looks like it should be fixed in 3.48.0
 * Source: https://github.com/primefaces/primevue/issues/4940
 */
import TableColumn, { ColumnSlots } from "primevue/column";
import { getColumnProps, IGridColumn } from "@/types/dataTable.ts";

const props = defineProps<IGridColumn>();
const slots = defineSlots<ColumnSlots>();
</script>
