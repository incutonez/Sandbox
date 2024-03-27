<template>
	<TableTree
		:columns="columns"
		:load="loadRecords"
	/>
</template>

<script setup lang="ts">
import { TreeItemModel } from "@incutonez/spec";
import { TreeNode } from "primevue/treenode";
import TableTree from "@/components/TableTree.vue";
import { TreeViewModel } from "@/models/TreeViewModel";
import { ITableColumn } from "@/types/table";

const columns: ITableColumn[] = [{
	field: "username",
	title: "Username",
	expandable: true,
}, {
	field: "date",
	title: "Date",
}, {
	field: "field",
	title: "Field",
}];

function getChildren(records: TreeItemModel[], parentIndex = "") {
	return records.map((record, recordIndex) => {
		parentIndex = parentIndex ? `${parentIndex}-${recordIndex}` : `${recordIndex}`;
		const node: TreeNode = {
			key: parentIndex,
			data: record,
		};
		if (Array.isArray(record.value)) {
			node.children = getChildren(record.value, parentIndex);
		}
		return node;
	});
}

async function loadRecords() {
	const { data } = await TreeViewModel.readAll();
	return {
		total: data.length,
		data: data.map((record, index) => {
			return {
				key: `${index}`,
				data: record,
				children: getChildren(record.items),
			};
		}),
	};
}
</script>
