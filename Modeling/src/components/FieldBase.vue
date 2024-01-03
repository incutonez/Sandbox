<template>
	<article :class="wrapperClasses">
		<FieldLabel
			v-if="label"
			:text="label"
			:required="required"
		/>
		<slot>
			<input
				class="border"
				:class="inputClasses"
				:readonly="readonly"
				v-bind="$attrs"
				v-model="modelValue"
			>
		</slot>
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import FieldLabel from "@/components/FieldLabel.vue";

interface IProps {
	label?: string;
	wrapperCls?: string;
	labelAlign?: "top" | "left";
	readonly?: boolean;
	required?: boolean;
}

defineOptions({
	inheritAttrs: false,
});
const props = withDefaults(defineProps<IProps>(), {
	labelAlign: "top",
	wrapperCls: undefined,
	label: undefined,
});
// Not sure what I'm missing... but this seems like an issue?  https://github.com/vuejs/core/issues/8276
// eslint-disable-next-line no-undef
const modelValue = defineModel("modelValue");

const wrapperClasses = computed(() => {
	const { labelAlign } = props;
	return {
		[props.wrapperCls ?? ""]: true,
		"flex flex-col gap-y-1": labelAlign === "top",
		"flex gap-x-2 items-center": labelAlign === "left",
	};
});
const inputClasses = computed(() => {
	const { readonly } = props;
	return {
		"border-transparent focus-visible:outline-none": readonly,
		"pl-1": !readonly,
	};
});
</script>
