<template>
	<BaseField v-bind="$props">
		<PrimeCheckbox v-model="modelValue" />
	</BaseField>
</template>

<script setup lang="ts">
import PrimeCheckbox from "primevue/checkbox";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

export interface IFieldCheckbox extends IBaseField {
}

defineProps<IFieldCheckbox>();
const modelValue = defineModel<boolean>("modelValue");
</script>
