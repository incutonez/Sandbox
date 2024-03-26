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
	</PrimeTreeTable>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Column from "primevue/column";
import { TreeNode } from "primevue/treenode";
import PrimeTreeTable from "primevue/treetable";
import IconSort from "@/assets/IconSort.vue";
import { useDataTable } from "@/components/table";
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
const filters = reactive({});
const { filterFields, columnsConfig, propsComponent, loading, recordsCached, start, getColumnMenuConfig, getCellDisplay, getCellParams } = useDataTable<TreeNode>(props, emit);
</script>
