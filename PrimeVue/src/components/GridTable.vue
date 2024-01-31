<template>
	<DataTable
		v-bind="propsComponent"
		:value="records"
		class="w-full"
		paginator
		paginator-template=""
	>
		<Column
			v-for="(column, index) in columns"
			:key="getColumnKey(column, index)"
			v-bind="getColumnProps(column)"
		/>
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
		<template #footer>
			<article class="flex">
				<section class="ml-auto flex gap-x-2">
					<BaseButton
						label="Previous"
						@click="onPagePrevious"
					/>
					<BaseButton
						label="Next"
						@click="onPageNext"
					/>
				</section>
			</article>
		</template>
	</DataTable>
</template>

<script setup lang="ts">
/**
 * Base component used for data tables.
 * Issues:
 * - Column Resizing: https://github.com/primefaces/primevue/issues/5104
 * - Can't redefine emits: https://github.com/vuejs/core/issues/8457
 */
import { computed } from "vue";
import Column from "primevue/column";
import DataTable, { DataTableProps, DataTableSlots } from "primevue/datatable";
import BaseButton from "@/components/BaseButton.vue";
import { getColumnKey, getColumnProps, IGridTable } from "@/types/dataTable";

const slots = defineSlots<DataTableSlots>();
const props = withDefaults(defineProps<IGridTable>(), {
	showLinesColumn: true,
	showLinesRow: true,
	showHoverRow: true,
	multiSelect: false,
	showStripedRows: true,
	columnsResize: true,
	columnsReorder: true,
});
const currentPage = defineModel<number>("currentPage", {
	default: 1,
});
const propsComponent = computed(() => {
	const tableProps: DataTableProps = {
		showGridlines: props.showLinesRow,
		rowHover: props.showHoverRow,
		scrollable: true,
		scrollHeight: "flex",
		size: "small",
		stripedRows: props.showStripedRows,
		resizableColumns: props.columnsResize,
		columnResizeMode: "fit",
		reorderableColumns: props.columnsReorder,
		removableSort: true,
	};
	if (props.multiSelect) {
		tableProps.selectionMode = "multiple";
	}
	else if (props.multiSelect === false) {
		tableProps.selectionMode = "single";
	}
	return tableProps;
});

function onPagePrevious() {
	currentPage.value--;
}

function onPageNext() {
	currentPage.value++;
}

/**
 * TODOJEF:
 * - Rows per page selector (use remoteMax prop, if it exists)
 * - Wire up previous and next
 * - Add a load method for server pagination
 * - Add sorting and filtering to the load method
 */
</script>
