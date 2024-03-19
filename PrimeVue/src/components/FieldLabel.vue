<template>
	<label
		v-if="!!text"
		class="block text-sm font-semibold text-gray-700"
		:class="cls"
	>{{ text }}{{ separator }}</label>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IFieldLabel {
	text: string;
	position?: "top" | "left";
	separator?: string;
}

const props = withDefaults(defineProps<IFieldLabel>(), {
	position: "left",
	separator: ":",
});
const cls = computed(() => {
	return {
		"mr-2 leading-8": props.position === "left",
		"mb-1": props.position === "top",
	};
});
</script>
