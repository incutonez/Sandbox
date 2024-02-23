<template>
	<label
		:class="cls"
		v-if="!!text"
	>{{ text }}:</label>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IProps {
	text: string;
	position?: "top" | "left";
}

const props = withDefaults(defineProps<IProps>(), {
	position: "left",
});
const cls = computed(() => {
	return {
		"mr-2": props.position === "left",
		"mb-2": props.position === "top",
	};
});
</script>
