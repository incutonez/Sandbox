<template>
	<article v-if="node.root">
		<section>{{ (node.data as TreeChangeModel).username }}</section>
		<section>{{ dateLongFormat((node.data as TreeChangeModel).date) }}</section>
	</article>
	<article v-else-if="node.leaf">
		{{ (node.data as TreeItemModel).field }}
	</article>
	<article v-else>
		{{ (node.data as TreeItemModel).field }}
	</article>
</template>

<script setup lang="ts">
import { TreeChangeModel, TreeItemModel } from "@incutonez/spec";
import { ITreeNode } from "@/types/table";
import { dateLongFormat } from "@/utils/common";

// TODOJEF: Need to add how many updates, deletes were done in the data
interface IProps {
	node: ITreeNode<TreeChangeModel | TreeItemModel>;
}

defineProps<IProps>();
</script>
