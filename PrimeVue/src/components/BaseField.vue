<template>
	<article
		class="flex w-max"
		:class="cls"
	>
		<FieldLabel
			:text="label"
			:position="labelPosition"
		/>
		<slot />
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FieldLabel, { IFieldLabel } from "@/components/FieldLabel.vue";

export interface IBaseField {
	label?: string;
	labelPosition?: IFieldLabel["position"];
}

const props = withDefaults(defineProps<IBaseField>(), {
	label: undefined,
	labelPosition: "top",
});
const cls = computed(() => {
	return {
		"flex-col": props.labelPosition === "top",
		"items-center": props.labelPosition === "left",
	};
});
</script>
