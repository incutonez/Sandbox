<template>
	<article v-if="node.root">
		<section class="flex items-center">
			<img
				:src="getAvatar()"
				alt="Avatar"
				class="mr-2 h-8 w-8 rounded-full"
			>
			<span class="text-base font-semibold">{{ rootNode.username }} at {{ dateLongFormat(rootNode.date) }}</span>
		</section>
		<section class="flex space-x-2 font-semibold">
			<span class="text-blue-500">{{ pluralize("create", rootNode.creates, true) }}</span>
			<span class="text-orange-500">{{ pluralize("update", rootNode.updates, true) }}</span>
			<span class="text-red-500">{{ pluralize("delete", rootNode.deletes, true) }}</span>
		</section>
	</article>
	<article v-else-if="node.leaf">
		{{ dataNode.field }}
	</article>
	<article v-else>
		{{ dataNode.field }}
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TreeChangeModel, TreeItemModel } from "@incutonez/spec";
import pluralize from "pluralize";
import { ITreeNode } from "@/types/table";
import { dateLongFormat, getAvatar } from "@/utils/common";

// TODOJEF: Need to add how many updates, deletes were done in the data
interface IProps {
	node: ITreeNode<TreeChangeModel | TreeItemModel>;
}

const props = defineProps<IProps>();
const rootNode = computed(() => props.node.data as TreeChangeModel);
const dataNode = computed(() => props.node.data as TreeItemModel);
</script>
