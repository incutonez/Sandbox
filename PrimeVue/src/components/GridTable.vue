<template>
	<DataTable
		v-bind="propsComponent"
		:value="records"
		class="w-full"
		@column-reorder="onReorder"
	>
		<Column
			v-for="column in columnsConfig"
			:key="column.id"
			v-bind="column.props"
		>
			<template #sorticon="slotProps">
				<template v-if="slotProps.sorted">
					<IconSort
						class="ml-1.5 h-4 w-4"
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
					:button-config="{ unstyled: true }"
					:menu-config="getColumnMenuConfig(column)"
					class="absolute right-1"
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
import { computed, markRaw, ref, watch } from "vue";
import Column from "primevue/column";
import DataTable, { DataTableColumnReorderEvent, DataTableProps, DataTableSlots } from "primevue/datatable";
import IconLock from "@/assets/IconLock.vue";
import IconNotAllowed from "@/assets/IconNotAllowed.vue";
import IconPin from "@/assets/IconPin.vue";
import IconResetColumn from "@/assets/IconResetColumn.vue";
import IconResetColumns from "@/assets/IconResetColumns.vue";
import IconSort from "@/assets/IconSort.vue";
import BaseButton from "@/components/BaseButton.vue";
import { IBaseMenu, IMenuItem } from "@/components/BaseMenu.vue";
import GridCellMenu from "@/components/GridCellMenu.vue";
import { getColumnProps, IGridColumn, IGridTable, setColumnLock } from "@/types/dataTable";

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
const columnsConfig = ref<IGridColumn[]>([]);
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

function getColumnMenuConfig(column: IGridColumn): IBaseMenu {
	const items: IMenuItem[] = [];
	if (column.stateful) {
		items.push({
			text: "Lock Column",
			icon: IconLock,
			items: [
				{
					text: "Left",
					icon: IconPin,
					iconCls: "rotate-90",
					click() {
						setColumnLock("left", column);
						reorderColumns();
					},
				},
				{
					text: "Right",
					icon: IconPin,
					iconCls: "-rotate-90",
					click() {
						setColumnLock("right", column);
						reorderColumns();
					},
				},
				{
					text: "None",
					icon: IconNotAllowed,
					click() {
						setColumnLock(false, column);
						reorderColumns();
					},
				},
			],
		}, {
			text: "Reset Column",
			icon: IconResetColumn,
		}, {
			text: "Reset All Columns",
			icon: IconResetColumns,
		});
	}
	return {
		items,
	};
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

watch(() => props.columns, (columns = []) => {
	columnsConfig.value = columns.map(({ ...initialConfig }, index) => {
		const column: IGridColumn = markRaw(initialConfig);
		column.id ??= column.field || `col_${index}`;
		column.indexOriginal = index;
		column.stateful ??= true;
		column.lock ??= false;
		column.props = getColumnProps(column);
		return column;
	});
	// TODO: eventually need to sort the columns based on state index
}, {
	immediate: true,
});

function reorderColumns() {
	// TODOJEF: There's an issue here where we drag a column to change its order, and then try to lock it... this
	// columnsConfig is sorted correctly, but it's not respected in the UI
	columnsConfig.value.sort(({ lock: lhs }, { lock: rhs }) => {
		if (lhs === "left") {
			return -1;
		}
		else if (rhs === "left") {
			return 1;
		}
		else if (lhs === false) {
			return -1;
		}
		else if (rhs === false) {
			return 1;
		}
		else if (lhs === "right") {
			return 1;
		}
		else if (rhs === "right") {
			return -1;
		}
		return 0;
	});
}

// TODO: Is this actually necessary?
function onReorder({ dragIndex, dropIndex }: DataTableColumnReorderEvent) {
	const element = columnsConfig.value[dragIndex];
	columnsConfig.value.splice(dragIndex, 1);
	columnsConfig.value.splice(dropIndex, 0, element);
}
</script>
