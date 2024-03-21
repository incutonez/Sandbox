<template>
	<article class="flex">
		<BaseButton
			v-for="(action, index) in actions"
			:key="index"
			plain
			class="!h-6 !p-1"
			v-bind="action"
		/>
	</article>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import { IBaseButton } from "@/types/components";

export interface IGridCellActions {
	actions: IBaseButton[];
}

defineProps<IGridCellActions>();
</script>
