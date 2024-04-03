<template>
	<TableTree
		:filters="filters"
		:columns="columns"
		:load="loadRecords"
		:hide-headers="true"
		:show-search="false"
	>
		<template #beforeSearch>
			<FieldCheckbox
				v-model="showUnchanged"
				label="Show Unchanged"
			/>
		</template>
	</TableTree>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { EnumChangeStatus, TreeItemModel } from "@incutonez/spec";
import { FilterMatchMode } from "primevue/api";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import TableTree from "@/components/TableTree.vue";
import { TreeViewModel } from "@/models/TreeViewModel";
import { IPassThroughOptions, ITableColumn, ITreeNode, TColumnFilters } from "@/types/table";
import { isEmpty } from "@/utils/common";
import { getPassThroughNode } from "@/utils/table";
import ColumnChange from "@/views/treeChanges/ColumnChange.vue";

const showUnchanged = ref(false);
const filters = reactive<TColumnFilters>({
	status: {
		value: EnumChangeStatus.Unchanged,
		matchMode: FilterMatchMode.NOT_EQUALS,
	},
});
const columns: ITableColumn<ITreeNode>[] = [{
	field: "field",
	expandable: true,
	cellComponent: ColumnChange,
}, {
	field: "value",
	classes: {
		bodyCell(options: IPassThroughOptions) {
			const node = getPassThroughNode(options);
			if (node.leaf) {
				const data = node.data as TreeItemModel;
				switch (data.status) {
					case EnumChangeStatus.Created:
						return "bg-sky-100";
					case EnumChangeStatus.Updated:
						return "bg-orange-100";
					case EnumChangeStatus.Deleted:
						return "bg-red-100";
					default:
						return "";
				}
			}
			return "hidden";
		},
	},
}];

function getChildren(records: TreeItemModel[], parentIndex = "") {
	return records.map((record, recordIndex) => {
		const { value } = record;
		const hasChildren = Array.isArray(value);
		const node: ITreeNode = {
			key: parentIndex ? `${parentIndex}-${recordIndex}` : `${recordIndex}`,
			data: record,
			leaf: !hasChildren || isEmpty(value),
		};
		if (hasChildren) {
			node.children = getChildren(value, node.key);
		}
		return node;
	});
}

async function loadRecords() {
	const { data } = await TreeViewModel.readAll();
	return {
		total: data.length,
		data: data.map((record, index) => {
			const children = getChildren(record.items, `${index}`);
			return {
				children,
				key: `${index}`,
				data: record,
				root: true,
				leaf: isEmpty(children),
			};
		}),
	};
}

watch(showUnchanged, ($showUnchanged) => {
	if ($showUnchanged) {
		delete filters.status;
	}
	else {
		filters.status = {
			value: EnumChangeStatus.Unchanged,
			matchMode: FilterMatchMode.NOT_EQUALS,
		};
	}
});
</script>
