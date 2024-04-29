<template>
	<BaseField v-bind="$props">
		<PrimeCalendar
			v-model="input"
			class="flex-1"
			:min-date="min"
			:max-date="max"
		/>
	</BaseField>
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeCalendar from "primevue/calendar";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

export interface IFieldDate extends IBaseField {
	min?: Date;
	max?: Date;
	timestamp?: boolean;
	modelValue?: string | number;
}

const props = defineProps<IFieldDate>();
const emit = defineEmits(["update:modelValue"]);
console.log("hi");
const input = computed({
	get() {
		const { modelValue = "" } = props;
		return props.timestamp ? new Date(modelValue) : modelValue.toString();
	},
	set(value) {
		if (props.timestamp) {
			if (!(value instanceof Date)) {
				value = new Date(value);
			}
			emit("update:modelValue", value.getTime());
		}
		else {
			emit("update:modelValue", value);
		}
	},
});
</script>
