<template>
	<article class="relative w-max">
		<FieldLabel
			:text="label"
			:class="labelCls"
		/>
		<PrimeInputNumber
			v-model="modelValue"
			:input-class="inputClasses"
			:disabled="disabled"
			:min="min"
			:max="max"
			@keyup="onKeyUp"
		/>
	</article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeInputNumber from "primevue/inputnumber";
import FieldLabel from "@/components/FieldLabel.vue";

// TODOJEF: Create a BaseField that has label and whatnot
interface IFieldNumber {
	label?: string;
	labelCls?: string;
	disabled?: boolean;
	/**
	 * Number of ms to delay before firing inputEnd event
	 */
	delay?: number;
	inputWidth?: string;
	inputCls?: string;
	min?: number;
	max?: number;
}
const props = withDefaults(defineProps<IFieldNumber>(), {
	label: undefined,
	labelCls: undefined,
	delay: 300,
	inputWidth: "w-44",
	inputCls: "",
	min: undefined,
	max: undefined,
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
