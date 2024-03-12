<template>
	<BaseField v-bind="$props">
		<PrimeCheckbox
			v-model="modelValue"
			:binary="binary"
		/>
	</BaseField>
</template>

<script setup lang="ts">
import PrimeCheckbox from "primevue/checkbox";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

export interface IFieldCheckbox extends IBaseField {
	binary?: boolean;
}

withDefaults(defineProps<IFieldCheckbox>(), {
	binary: true,
});
const modelValue = defineModel<boolean>("modelValue");
</script>
