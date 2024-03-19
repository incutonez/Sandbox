<template>
	<article
		class="base-field flex min-w-0"
		:class="cls"
	>
		<FieldLabel
			:text="label"
			:position="labelPosition"
			:class="labelCls"
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
	labelCls?: string;
}

const props = withDefaults(defineProps<IBaseField>(), {
	label: undefined,
	labelPosition: "left",
	labelCls: undefined,
});
const cls = computed(() => {
	return {
		"flex-col": props.labelPosition === "top",
		"items-center": props.labelPosition === "left",
	};
});
</script>
