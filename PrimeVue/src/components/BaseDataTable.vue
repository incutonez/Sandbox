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
				:name="slot"
				v-bind="scope ?? {}"
			/>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
import { computed } from "vue";
import DataTable, { DataTableProps } from "primevue/datatable";
import { IBaseDataTable } from "@/types/dataTable";

const props = withDefaults(defineProps<IBaseDataTable>(), {
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

<style scoped lang="scss"></style>
