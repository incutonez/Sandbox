<template>
	<TableTree
		:filters="filters"
		:columns="columns"
		:load="loadRecords"
		:show-search="false"
		show-striped-rows
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
import ColumnField from "@/views/auditor/ColumnField.vue";
import ColumnValue from "@/views/auditor/ColumnValue.vue";

const showUnchanged = ref(false);
const filters = reactive<TColumnFilters>({
	status: {
		value: EnumChangeStatus.Unchanged,
		matchMode: FilterMatchMode.NOT_EQUALS,
	},
});
const columns: ITableColumn<ITreeNode>[] = [{
	title: "Field",
	field: "field",
	expandable: true,
	cellComponent: ColumnField,
}, {
	title: "Value",
	field: "value",
	titleCls: "justify-center",
	cellComponent: ColumnValue,
	classes: {
		bodyCell(options: IPassThroughOptions) {
			const node = getPassThroughNode<TreeItemModel>(options);
			if (node.leaf) {
				const { data } = node;
				switch (data.status) {
					case EnumChangeStatus.Created:
						return "bg-sky-200";
					case EnumChangeStatus.Updated:
						return "bg-orange-200";
					case EnumChangeStatus.Deleted:
						return "bg-red-200";
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
