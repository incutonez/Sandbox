<template>
	<PrimeDropdown v-bind="$props" />
</template>

<script setup lang="ts">
import PrimeDropdown from "primevue/dropdown";

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
}

withDefaults(defineProps<IFieldComboBox>(), {
	optionLabel: "name",
	optionValue: "id",
	options: () => [],
});
</script>
