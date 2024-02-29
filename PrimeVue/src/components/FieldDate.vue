<template>
	<BaseField v-bind="$props">
		<PrimeCalendar
			class="flex-1"
			v-model="input"
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
const input = computed({
	get() {
		const { modelValue = "" } = props;
		return props.timestamp ? new Date(modelValue) : modelValue;
	},
	set(value) {
		if (props.timestamp) {
			if (!(value instanceof Date)) {
				value = new Date(value);
			}
			value = value.getTime();
		}
		emit("update:modelValue", value);
	},
});
</script>
