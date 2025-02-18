<script setup lang="ts">
import { computed } from "vue";
import PrimeTextArea from "primevue/textarea";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

interface IFieldTextArea extends IBaseField {
	disabled?: boolean;
	/**
   * Number of ms to delay before firing inputEnd event
   */
	delay?: number;
	inputWidth?: string;
	autoFocus?: boolean;
	inputClasses?: string;
}

let inputEndTimer: ReturnType<typeof setTimeout>;
const emit = defineEmits(["inputEnd", "inputClear", "blur"]);
const props = withDefaults(defineProps<IFieldTextArea>(), {
	type: "text",
	delay: 300,
	inputWidth: "w-full",
	inputClasses: "",
});
const modelValue = defineModel<string>();
const inputCls = computed(() => {
	return {
		[props.inputWidth]: true,
		[props.inputClasses]: true,
	};
});

function onKeyUp() {
	clearTimeout(inputEndTimer);
	inputEndTimer = setTimeout(() => emit("inputEnd"), props.delay);
}
</script>

<template>
	<BaseField v-bind="$props">
		<PrimeTextArea
			v-model="modelValue"
			:class="inputCls"
			:disabled="disabled"
			@keyup="onKeyUp"
		/>
	</BaseField>
</template>
