<template>
	<article>
		<FieldLabel
			:text="label"
			:class="labelCls"
		/>
		<PrimeDropdown
			v-bind="$props"
			v-model="modelValue"
		/>
	</article>
</template>

<script setup lang="ts">
import PrimeDropdown from "primevue/dropdown";
import FieldLabel from "@/components/FieldLabel.vue";

// TODOJEF: Add Symbol for disabled options, and then set it up to use that in the optionDisabled fn
export interface IOption {
	id?: string | number;
	name?: string;
	[key: string]: any;
}

export interface IFieldComboBox {
	options?: IOption[];
	optionLabel?: string | ((data: any) => string) | undefined;
	optionValue?: string | ((data: any) => any) | undefined;
	disabled?: boolean;
	showClear?: boolean;
	label?: string;
	labelCls?: string;
}

withDefaults(defineProps<IFieldComboBox>(), {
	optionLabel: "name",
	optionValue: "id",
	label: undefined,
	labelCls: undefined,
	options: () => [],
});
const modelValue = defineModel<any>("modelValue");
</script>
