<template>
	<DataTable
		v-bind="propsComponent"
		:value="records"
		class="w-full"
	>
		<Column
			v-for="(column, index) in columns"
			:key="getColumnKey(column, index)"
			v-bind="getColumnProps(column)"
		>
			<template #sorticon="slotProps">
				<template v-if="slotProps.sorted">
					<BaseIcon
						icon="sort"
						class="ml-1.5 !text-base !leading-none"
						:class="slotProps.sortOrder === 1 ? 'rotate-180 -scale-x-100' : ''"
					/>
				</template>
			</template>
			<template #body="slotProps">
				<Component
					v-if="column.cellComponent"
					:is="column.cellComponent"
					v-bind="getCellParams(column, slotProps.data)"
				/>
				<span v-else>
					{{ slotProps.data[slotProps.field] }}
				</span>
			</template>
			<template
				#header
				v-if="column.showMenu ?? true"
			>
				<GridCellMenu
					:menu-config="columnMenuItems"
					class="absolute right-0 hidden group-hover:block"
				/>
			</template>
		</Column>
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
import IconPin from "@/assets/IconPin.vue";
import IconResetColumn from "@/assets/IconResetColumn.vue";
import IconResetColumns from "@/assets/IconResetColumns.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { IBaseMenu } from "@/components/BaseMenu.vue";
import GridCellMenu from "@/components/GridCellMenu.vue";
import { getColumnKey, getColumnProps, IGridColumn, IGridTable } from "@/types/dataTable";

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
		columnResizeMode: "expand",
		reorderableColumns: props.columnsReorder,
		removableSort: true,
		paginator: true,
		paginatorTemplate: "",
		// TODOJEF: Need to be configurable
		rows: 20,
	};
	if (props.multiSelect) {
		tableProps.selectionMode = "multiple";
	}
	else if (props.multiSelect === false) {
		tableProps.selectionMode = "single";
	}
	return tableProps;
});
const columnMenuItems: IBaseMenu = {
	items: [
		{
			text: "Lock Column",
			icon: IconPin,
		},
		{
			text: "Reset Column",
			icon: IconResetColumn,
		},
		{
			text: "Reset All Columns",
			icon: IconResetColumns,
		},
	],
};

function onPagePrevious() {
	currentPage.value--;
}

function onPageNext() {
	currentPage.value++;
}

function getCellParams({ cellParams }: IGridColumn, data: any) {
	if (typeof cellParams === "function") {
		return cellParams(data);
	}
	return cellParams;
}

/**
 * TODOJEF:
 * - Rows per page selector (use remoteMax prop, if it exists)
 * - Wire up previous and next
 * - Add a load method for server pagination
 * - Add sorting and filtering to the load method
 * - Have remote and local filtering/sorting/paging
 * - Add my own pagination toolbar
 * - Add a search field that does global searching
 * - Add a custom column menu, which allows to dynamically hide, pin, reset columns
 */
</script>
