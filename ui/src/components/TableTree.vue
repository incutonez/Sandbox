<template>
	<PrimeTreeTable
		v-bind="propsComponent"
		v-model:filters="filters"
		:global-filter-fields="filterFields"
		:value="loading ? [] : recordsCached"
		:first="start"
		:loading="loading"
		:rows="rowsPerPage"
		class="w-full"
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
					v-bind="getCellParams(column, slotProps.node.data)"
				/>
				<span v-else>
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
import { reactive } from "vue";
import Column from "primevue/column";
import { TreeNode } from "primevue/treenode";
import PrimeTreeTable from "primevue/treetable";
import IconPageLeft from "@/assets/IconPageLeft.vue";
import IconPageRight from "@/assets/IconPageRight.vue";
import IconSort from "@/assets/IconSort.vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import TableCellMenu from "@/components/TableCellMenu.vue";
import { ITableEmit, ITableGrid } from "@/types/table";
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
});
const emit = defineEmits<ITableEmit>();
const filters = reactive({});
const { filterFields, columnsConfig, rowsPerPage, propsComponent, loading, recordsCached, start, isPageFirst, isPageLast, totalPages, recordsTotal, currentPage, startDisplay, endDisplay, loadRecords, getColumnMenuConfig, getNodeDisplay, getCellParams, previousPage, nextPage, changePage, changeRowsPerPage } = useDataTable<TreeNode>(props, emit);

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

loadRecords();
</script>
