<template>
	<article class="flex w-full items-center">
		<section
			v-if="hasPrevious"
			class="flex-1 text-center"
		>
			{{ dataNode.previous }}
		</section>
		<IconChange
			v-if="hasPrevious"
			class="size-6"
		/>
		<section class="flex-1 text-center">
			{{ dataNode.value }}
		</section>
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TreeChangeModel, TreeItemModel } from "@incutonez/spec";
import IconChange from "@/assets/IconChange.vue";
import { ITreeNode } from "@/types/table";

interface IProps {
	node: ITreeNode<TreeChangeModel | TreeItemModel>;
}

const props = defineProps<IProps>();
const dataNode = computed(() => props.node.data as TreeItemModel);
const hasPrevious = computed(() => dataNode.value.previous !== undefined);
</script>
