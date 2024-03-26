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
				<TableCellMenu
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
import { computed, reactive, watch } from "vue";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column";
import DataTable, { DataTableColumnReorderEvent } from "primevue/datatable";
import IconAdd from "@/assets/IconAdd.vue";
import IconPageLeft from "@/assets/IconPageLeft.vue";
import IconPageRight from "@/assets/IconPageRight.vue";
import IconSort from "@/assets/IconSort.vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { RowsPerPageOptions, useDataTable } from "@/components/table";
import TableCellMenu from "@/components/TableCellMenu.vue";
import { ITableEmit, ITableGrid } from "@/types/table";

const props = withDefaults(defineProps<ITableGrid>(), {
	showLinesColumn: true,
	showLinesRow: true,
	showHoverRow: true,
	showStripedRows: true,
	showRowsPerPage: true,
	multiSelect: false,
	columnsResize: true,
	columnsReorder: true,
});
const emit = defineEmits<ITableEmit>();
const { filterFields, columnsConfig, propsComponent, recordsTotal, start, loading, rowsPerPage, currentPage, recordsCached, search, loadRecords, previousPage, nextPage, changeRowsPerPage, getColumnMenuConfig, getCellDisplay, getCellParams } = useDataTable(props, emit);
const filters = reactive<any>({
	global: {
		value: null,
		matchMode: FilterMatchMode.CONTAINS,
	},
});
const startDisplay = computed(() => (recordsTotal.value === 0 ? 0 : start.value + 1));
const endDisplay = computed(() => {
	const end = start.value + rowsPerPage.value;
	return end > recordsTotal.value ? recordsTotal.value : end;
});
const isPageFirst = computed(() => currentPage.value === 1);
const isPageLast = computed(() => start.value + rowsPerPage.value >= recordsTotal.value);
const totalPages = computed(() => Math.ceil(recordsTotal.value / rowsPerPage.value));

function onPagePrevious() {
	previousPage();
}

function onPageNext() {
	nextPage();
}

function onChangeRows(value: number) {
	changeRowsPerPage(value);
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

loadRecords();

defineExpose({
	loadRecords,
	reloadRecords,
});
</script>
