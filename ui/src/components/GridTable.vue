<template>
	<DataTable
		v-bind="propsComponent"
		v-model:filters="filters"
		:global-filter-fields="filterFields"
		:value="loading ? [] : recordsCached"
		:first="start"
		:loading="loading"
		:rows="rowsPerPage"
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
					:is="column.cellComponent"
					v-if="column.cellComponent"
					v-bind="getCellParams(column, slotProps.data)"
				/>
				<span v-else>
					{{ getCellDisplay(column, slotProps) }}
				</span>
			</template>
			<template
				v-if="column.showMenu ?? true"
				#header
			>
				<GridCellMenu
					:button-config="{ plain: true }"
					:menu-config="getColumnMenuConfig(column)"
					class="absolute right-1"
				/>
			</template>
		</Column>
		<template #header>
			<section class="flex">
				<h2 v-if="title">
					{{ title }}
				</h2>
				<section class="ml-auto flex gap-x-2">
					<FieldText
						v-model="search"
						label="Search"
						@input-clear="onSearch"
						@input-end="onSearch"
					/>
					<slot name="addEntity">
						<BaseButton
							v-bind="addEntityConfig"
							:icon="IconAdd"
							icon-cls="mr-0.5"
						/>
					</slot>
				</section>
			</section>
		</template>
		<template #footer>
			<article class="flex items-center justify-between">
				<FieldComboBox
					v-if="showRowsPerPage"
					:model-value="rowsPerPage"
					class="w-auto"
					label-cls="text-sm"
					label="Rows"
					:options="RowsPerPageOptions"
					@update:model-value="onChangeRows"
				/>
				<section class="flex items-center gap-x-2">
					<BaseButton
						title="Previous"
						:disabled="isPageFirst"
						plain
						class="!p-0"
						:icon="IconPageLeft"
						icon-cls="h-8 w-8"
						@click="onPagePrevious"
					/>
					<FieldNumber
						label="Page"
						input-width="w-10"
						input-cls="text-center !px-2 !py-1"
						label-cls="text-sm"
						:min="1"
						:model-value="currentPage"
						@update:model-value="onChangePage"
					/>
					<span class="text-sm">of {{ totalPages }}</span>
					<BaseButton
						title="Next"
						:disabled="isPageLast"
						plain
						class="!p-0"
						:icon="IconPageRight"
						icon-cls="h-8 w-8"
						@click="onPageNext"
					/>
				</section>
				<span class="text-sm">{{ startDisplay }} - {{ endDisplay }} of {{ recordsTotal }}</span>
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
import { computed, markRaw, reactive, ref, unref, watch } from "vue";
import { type FilterType } from "@incutonez/api-spec/dist";
import get from "just-safe-get";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import DataTable, { DataTableColumnReorderEvent, DataTableProps } from "primevue/datatable";
import IconAdd from "@/assets/IconAdd.vue";
import IconLock from "@/assets/IconLock.vue";
import IconNotAllowed from "@/assets/IconNotAllowed.vue";
import IconPageLeft from "@/assets/IconPageLeft.vue";
import IconPageRight from "@/assets/IconPageRight.vue";
import IconPin from "@/assets/IconPin.vue";
import IconResetColumn from "@/assets/IconResetColumn.vue";
import IconResetColumns from "@/assets/IconResetColumns.vue";
import IconSort from "@/assets/IconSort.vue";
import BaseButton from "@/components/BaseButton.vue";
import { IBaseMenu } from "@/components/BaseMenu.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import GridCellMenu from "@/components/GridCellMenu.vue";
import { IMenuItem } from "@/types/components";
import { getColumnProps, IGridColumn, IGridTable, RowsPerPageOptions, setColumnLock } from "@/types/dataTable";

const props = withDefaults(defineProps<IGridTable>(), {
	showLinesColumn: true,
	showLinesRow: true,
	showHoverRow: true,
	showStripedRows: true,
	showRowsPerPage: true,
	multiSelect: false,
	columnsResize: true,
	columnsReorder: true,
});
const rowsPerPage = defineModel<number>("rowsPerPage", {
	default: 20,
});
const emit = defineEmits<{
	load: [];
}>();
const currentPage = defineModel<number>("currentPage", {
	default: 1,
});
const search = ref("");
const filterFields = ref<string[]>([]);
const filters = reactive<any>({
	global: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
});
const recordsCached = ref<unknown[]>([]);
const recordsTotal = ref(0);
const loading = ref(false);
const columnsConfig = ref<IGridColumn[]>([]);
const max = computed(() => props.remoteMax ?? rowsPerPage.value);
const start = computed(() => (currentPage.value - 1) * rowsPerPage.value);
const startDisplay = computed(() => (recordsTotal.value === 0 ? 0 : start.value + 1));
const endDisplay = computed(() => {
	const end = start.value + rowsPerPage.value;
	return end > recordsTotal.value ? recordsTotal.value : end;
});
const isPageFirst = computed(() => currentPage.value === 1);
const isPageLast = computed(() => start.value + rowsPerPage.value >= recordsTotal.value);
const totalPages = computed(() => Math.ceil(recordsTotal.value / rowsPerPage.value));
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

function onChangeRows(value: number) {
	currentPage.value = Math.floor((start.value + 1) / value) + 1;
	rowsPerPage.value = value;
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
			items: [{
				text: "Left",
				icon: IconPin,
				iconCls: "rotate-90",
				click() {
					setColumnLock("left", column);
					reorderColumns();
				},
			}, {
				text: "Right",
				icon: IconPin,
				iconCls: "-rotate-90",
				click() {
					setColumnLock("right", column);
					reorderColumns();
				},
			}, {
				text: "None",
				icon: IconNotAllowed,
				click() {
					setColumnLock(false, column);
					reorderColumns();
				},
			}],
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

function clearCache() {
	recordsCached.value = [];
}

function resetPage() {
	currentPage.value = 1;
}

async function reloadRecords() {
	clearCache();
	return loadRecords();
}

async function loadRecords(loadCount?: number) {
	const { load } = props;
	if (load) {
		const $recordsCached = unref(recordsCached);
		const $start = unref(start);
		const $recordsTotal = unref(recordsTotal);
		let i = $start;
		let isCached = true;
		let lastIndex = $start + rowsPerPage.value;
		// We need to adjust the last index if we're out of bounds from the total
		if ($recordsTotal) {
			lastIndex = lastIndex > $recordsTotal - 1 ? $recordsTotal : lastIndex;
		}
		// Check to see if we've already cached all the records in the range we're about to load
		for (i; i < lastIndex; i++) {
			if ($recordsCached[i] === undefined) {
				isCached = false;
				break;
			}
		}
		/**
		 * If our loadCount is >= rowsPerPage, then that means we've loaded the range... we must check rowsPerPage because
		 * the max isn't sufficient enough, as it could just be the remoteMax value instead of how many rows we want to
		 * display.  We also check to see if we've loaded < the max, as that means we've most likely hit the last row of
		 * results.
		 */
		if (isCached || loadCount === 0 || loadCount === $recordsTotal || (loadCount && (loadCount >= rowsPerPage.value || loadCount < max.value))) {
			loading.value = false;
			return;
		}
		const page = currentPage.value;
		const $max = unref(max);
		loading.value = true;
		try {
			const filters: FilterType[] = [];
			if (search.value) {
				filters.push({
					type: "Search",
					value: search.value,
				});
			}
			const response = await load({
				page,
				filters,
				start: i,
				limit: $max,
			});
			const data = Array.isArray(response) ? response : response.data ?? [];
			loadCount ??= 0;
			loadCount += data.length;
			if (response.total) {
				recordsTotal.value = response.total;
			}
			for (const item of data) {
				$recordsCached[i++] = item;
			}
			// Fire off the next load, in case we need to get the next page of records
			loadRecords(loadCount);
		}
		catch (ex) {
			loading.value = false;
			throw ex;
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

function onSearch() {
	if (props.remote) {
		resetPage();
		reloadRecords();
	}
	else {
		filters.global.value = search.value;
	}
}

function onChangePage(value: number) {
	if (!value) {
		value = 1;
	}
	else if (value > totalPages.value) {
		value = totalPages.value;
	}
	currentPage.value = value;
	loadRecords();
}

watch(() => props.records, ($records = []) => (recordsCached.value = $records), {
	immediate: true,
});

watch(() => props.columns, (columns = []) => {
	const { remote } = props;
	filterFields.value = [];
	columnsConfig.value = columns.map(({ ...initialConfig }, index) => {
		const column: IGridColumn = markRaw(initialConfig);
		column.id ??= column.field || `col_${index}`;
		column.indexOriginal = index;
		column.stateful ??= true;
		column.lock ??= false;
		column.props = getColumnProps(column);
		if (column.field && !remote) {
			filterFields.value.push(column.field);
		}
		return column;
	});
	// TODO: eventually need to sort the columns based on state index
}, {
	immediate: true,
});

loadRecords();

defineExpose({
	loadRecords,
	reloadRecords,
});
</script>
