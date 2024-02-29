<template>
	<label
		class="text-sm font-semibold text-gray-700"
		:class="cls"
		v-if="!!text"
	>{{ text }}:</label>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IFieldLabel {
	text: string;
	position?: "top" | "left";
}

const props = withDefaults(defineProps<IFieldLabel>(), {
	position: "left",
});
const cls = computed(() => {
	return {
		"mr-2 leading-8": props.position === "left",
		"mb-1": props.position === "top",
	};
});
</script>
