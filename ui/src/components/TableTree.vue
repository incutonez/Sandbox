<template>
	<PrimeTreeTable
		v-bind="propsComponent as TreeTableProps"
		:value="loading ? [] : recordsFiltered"
		:first="start"
		:loading="loading"
		:rows="rowsPerPage"
		filter-mode="strict"
		class="w-full"
		:class="hideHeaders ? 'table-hide-headers' : undefined"
	>
		<Column
			v-for="column in columnsConfig"
			:key="column.id"
			v-bind="column.props"
		>
			<template #sorticon="slotProps">
				<template v-if="slotProps.sorted">
					<IconSort
						class="ml-1.5 size-4"
						:class="slotProps.sortOrder === 1 ? 'rotate-180 -scale-x-100' : ''"
					/>
				</template>
			</template>
			<template #body="slotProps">
				<Component
					:is="column.cellComponent"
					v-if="column.cellComponent"
					v-bind="getNodeParams(column, slotProps.node)"
					:class="getCellClass(column, slotProps.node)"
				/>
				<span
					v-else
					:class="getCellClass(column, slotProps.node)"
				>
					{{ getNodeDisplay(column, slotProps) }}
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
					<slot name="beforeSearch" />
					<FieldText
						v-if="showSearch"
						v-model="search"
						label="Search"
						@input-clear="onSearch"
						@input-end="onSearch"
					/>
					<slot
						v-if="showAddEntity"
						name="addEntity"
					>
						<BaseButton
							v-bind="addEntityConfig"
							:icon="IconAdd"
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
	</PrimeTreeTable>
</template>

<script setup lang="ts">
import { ref, unref, watch } from "vue";
import { FilterMatchMode } from "@primevue/core/api";
import Column from "primevue/column";
import PrimeTreeTable, { TreeTableProps } from "primevue/treetable";
import IconAdd from "@/assets/IconAdd.vue";
import IconPageLeft from "@/assets/IconPageLeft.vue";
import IconPageRight from "@/assets/IconPageRight.vue";
import IconSort from "@/assets/IconSort.vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import TableCellMenu from "@/components/TableCellMenu.vue";
import { ITableEmit, ITableFilter, ITableGrid, ITableTreeFilter, ITreeNode } from "@/types/table";
import { clone, isEmpty } from "@/utils/common";
import { RowsPerPageOptions, useDataTable } from "@/utils/table";

const props = withDefaults(defineProps<ITableGrid>(), {
	showLinesColumn: true,
	showLinesRow: true,
	showHoverRow: true,
	showStripedRows: true,
	showRowsPerPage: true,
	multiSelect: false,
	columnsResize: true,
	columnsReorder: true,
	showSearch: true,
	showAddEntity: false,
});
const emit = defineEmits<ITableEmit>();
const recordsFiltered = ref<ITreeNode[]>([]);
/**
 * @patch https://github.com/primefaces/primevue/issues/5512
 * Filters seem busted, at least being able to use them as an object, so I'm going to implement it a little
 * differently until there's a response on that issue.
 */
const { columnsConfig, search, rowsPerPage, propsComponent, loading, recordsCached, start, isPageFirst, isPageLast, totalPages, recordsTotal, currentPage, startDisplay, endDisplay, loadRecords, getColumnMenuConfig, getNodeDisplay, getCellClass, getNodeParams, previousPage, nextPage, changePage, changeRowsPerPage, filters } = useDataTable<ITreeNode>(props, emit);

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

function onPagePrevious() {
	previousPage();
}

function onPageNext() {
	nextPage();
}

function onChangeRows(value: number) {
	changeRowsPerPage(value);
}

function onChangePage(value: number) {
	changePage(value);
}

function onSearch() {
	if (props.remote) {
		resetPage();
		reloadRecords();
	}
	else {
		filters.global = {
			value: search.value,
			matchMode: FilterMatchMode.CONTAINS,
		};
	}
}

function includeInFilter({ record, filters, filterFields }: { record: ITreeNode, filters: ITableFilter, filterFields: string[] }): boolean {
	let include = isEmpty(filterFields);
	const { data } = record;
	for (const field of filterFields) {
		const { matchMode, value } = filters[field] as ITableTreeFilter;
		switch (matchMode) {
			case FilterMatchMode.EQUALS:
				include = data[field as keyof typeof data] === value;
				break;
			case FilterMatchMode.NOT_EQUALS:
				include = data[field as keyof typeof data] !== value;
				break;
		}
		if (include) {
			break;
		}
	}
	if (record.children) {
		record.children = record.children.filter((node) => includeInFilter({
			filters,
			filterFields,
			record: node,
		}));
		include = !isEmpty(record.children);
	}
	return include;
}

function updateFilters() {
	const $filters = unref(filters);
	const filterFields = Object.keys($filters);
	/* TODOJEF: I don't like cloning like this, but we need to filter the children out if they don't match the criteria,
   * but we need to restore the data when the filter is removed */
	const records = clone(recordsCached.value);
	recordsFiltered.value = records.filter((node) => includeInFilter({
		record: node,
		filters: $filters,
		filterFields,
	}));
}

watch(filters, () => updateFilters(), {
	deep: true,
	immediate: true,
});

watch(recordsCached, () => updateFilters(), {
	immediate: true,
	deep: true,
});

loadRecords();

defineExpose({
	records: recordsCached,
});
</script>
