<template>
	<DataTable
		v-bind="propsComponent"
		:value="records"
		class="w-full"
	>
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
	</DataTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import DataTable, { DataTableProps, DataTableSlots } from "primevue/datatable";
import { IGridTable } from "@/types/dataTable";

// Can't redefine emits, due to https://github.com/vuejs/core/issues/8457
const slots = defineSlots<DataTableSlots>();
const props = withDefaults(defineProps<IGridTable>(), {
	showLinesColumn: true,
	showLinesRow: true,
	showHoverRow: true,
	multiSelect: false,
	showStripedRows: true,
});
const propsComponent = computed(() => {
	const tableProps: DataTableProps = {
		showGridlines: props.showLinesRow,
		rowHover: props.showHoverRow,
		scrollable: true,
		scrollHeight: "flex",
		size: "small",
		stripedRows: props.showStripedRows,
	};
	if (props.multiSelect) {
		tableProps.selectionMode = "multiple";
	}
	else if (props.multiSelect === false) {
		tableProps.selectionMode = "single";
	}
	return tableProps;
});
</script>
