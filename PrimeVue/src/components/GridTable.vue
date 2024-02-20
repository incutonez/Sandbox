<template>
	<DataTable
		v-bind="propsComponent"
		:value="recordsCached"
		:first="startRow"
		:loading="loading"
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
					{{ getCellDisplay(column, slotProps) }}
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
						:disabled="isPageFirst"
						@click="onPagePrevious"
					/>
					<BaseButton
						label="Next"
						:disabled="isPageLast"
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
import { computed, markRaw, ref, unref, watch } from "vue";
import get from "just-safe-get";
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
	rowsPerPage: 20,
});
const emit = defineEmits<{
	load: [];
}>();
const currentPage = defineModel<number>("currentPage", {
	default: 1,
});
const recordsCached = ref<unknown[]>([]);
const recordsTotal = ref(0);
const loading = ref(false);
const columnsConfig = ref<IGridColumn[]>([]);
const max = computed(() => props.remoteMax ?? props.rowsPerPage);
const start = computed(() => (currentPage.value - 1) * max.value);
const startRow = computed(() => (currentPage.value - 1) * props.rowsPerPage);
const isPageFirst = computed(() => currentPage.value === 1);
const isPageLast = computed(() => start.value + max.value >= recordsTotal.value);
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
		rows: props.rowsPerPage,
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
	loadRecords();
}

function onPageNext() {
	currentPage.value++;
	loadRecords();
}

function getCellDisplay({ cellDisplay }: IGridColumn, slotProps: any) {
	if (cellDisplay) {
		return cellDisplay(slotProps.data, recordsCached.value);
	}
	return get(slotProps.data, slotProps.field);
}

function getCellParams({ cellParams }: IGridColumn, data: any) {
	if (typeof cellParams === "function") {
		return cellParams(data, recordsCached.value);
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

function getLoadIndex(startIndex = startRow.value) {
	let load = false;
	const $recordsCached = unref(recordsCached);
	for (let i = startIndex; i < startIndex + props.rowsPerPage; i++) {
		if ($recordsCached[i] === undefined) {
			startIndex = i;
			load = true;
			break;
		}
	}
	return load ? startIndex : undefined;
}

async function loadRecords(totalLoaded = 0) {
	const { load } = props;
	if (load) {
		let i = getLoadIndex();
		if (i === undefined) {
			return;
		}
		const page = currentPage.value;
		const $max = unref(max);
		// 0-based index
		loading.value = true;
		try {
			const response = await load({
				start: i,
				page,
				max: $max,
			});
			const $recordsCached = unref(recordsCached);
			const data = Array.isArray(response) ? response : response.data ?? [];
			if (response.total) {
				recordsTotal.value = response.total;
			}
			totalLoaded += data.length;
			for (const item of data) {
				$recordsCached[i++] = item;
			}
			if (totalLoaded !== 0 && totalLoaded < props.rowsPerPage) {
				loadRecords(totalLoaded);
			}
		}
		finally {
			loading.value = false;
		}
	}
	else {
		emit("load");
	}
}

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

watch(() => props.records, ($records = []) => (recordsCached.value = $records), {
	immediate: true,
});

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

loadRecords();

defineExpose({
	loadRecords,
});
</script>
