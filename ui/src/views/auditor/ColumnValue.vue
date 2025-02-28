<script setup lang="ts">
import { computed } from "vue";
import { IconChange } from "@incutonez/core-ui/assets";
import { ITreeNode } from "@incutonez/core-ui/types";
import { TreeChangeModel, TreeItemModel } from "@incutonez/spec";

interface IProps {
	node: ITreeNode<TreeChangeModel | TreeItemModel>;
}

const props = defineProps<IProps>();
const dataNode = computed(() => props.node.data as TreeItemModel);
const hasPrevious = computed(() => dataNode.value.previous !== undefined);
</script>

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
