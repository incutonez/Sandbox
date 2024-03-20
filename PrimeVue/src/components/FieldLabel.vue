<template>
	<label
		v-if="!!text"
		class="block font-semibold text-gray-700"
		:class="cls"
	>{{ text }}{{ separator }}</label>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IFieldLabel {
	text: string;
	position?: "top" | "left";
	separator?: string;
	size?: "small" | "medium";
}

const props = withDefaults(defineProps<IFieldLabel>(), {
	position: "left",
	separator: ":",
	size: "small",
});
const cls = computed(() => {
	const { size, position } = props;
	return {
		"mr-2 leading-8": position === "left",
		"mb-1": position === "top",
		"text-sm": size === "small",
		"text-base": size === "medium",
	};
});
</script>
