<template>
	<BaseField v-bind="$props">
		<PrimeInputNumber
			v-model="modelValue"
			class="flex-1"
			:input-class="inputClasses"
			:disabled="disabled"
			:min="min"
			:max="max"
			:min-fraction-digits="decimalPlaces"
			@keyup="onKeyUp"
		/>
	</BaseField>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeInputNumber from "primevue/inputnumber";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

// TODOJEF: Create a BaseField that has label and whatnot
interface IFieldNumber extends IBaseField {
	disabled?: boolean;
	/**
	 * Number of ms to delay before firing inputEnd event
	 */
	delay?: number;
	inputWidth?: string;
	inputCls?: string;
	min?: number;
	max?: number;
	decimalPlaces?: number;
}
const props = withDefaults(defineProps<IFieldNumber>(), {
	label: undefined,
	delay: 300,
	inputWidth: "",
	inputCls: "",
	min: undefined,
	max: undefined,
	decimalPlaces: 0,
});
const emit = defineEmits(["inputEnd"]);
const modelValue = defineModel<number>();
let inputEndTimer: ReturnType<typeof setTimeout>;
const inputClasses = computed(() => {
	return {
		[props.inputWidth]: true,
		[props.inputCls]: true,
	};
});

function onKeyUp() {
	clearTimeout(inputEndTimer);
	inputEndTimer = setTimeout(() => emit("inputEnd"), props.delay);
}
</script>
