<template>
	<article>
		<FieldLabel
			:text="label"
			:class="labelCls"
		/>
		<PrimeDropdown
			v-bind="$props"
			v-model="model"
		/>
	</article>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import PrimeDropdown from "primevue/dropdown";
import FieldLabel from "@/components/FieldLabel.vue";
import { IOption } from "@/types/components";

export interface IFieldComboBox {
	options?: IOption[];
	optionLabel?: string | ((data: any) => string) | undefined;
	optionValue?: string | ((data: any) => any) | undefined;
	disabled?: boolean;
	showClear?: boolean;
	label?: string;
	labelCls?: string;
	valueOnly?: boolean;
	modelValue?: any;
}

const props = withDefaults(defineProps<IFieldComboBox>(), {
	optionLabel: "name",
	optionValue: "id",
	label: undefined,
	labelCls: undefined,
	valueOnly: true,
	options: () => [],
	modelValue: undefined,
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
	get() {
		const { modelValue } = props;
		return props.valueOnly ? modelValue[props.optionValue as keyof typeof modelValue] : modelValue;
	},
	set(value) {
		emit("update:modelValue", props.valueOnly ? value : getSelected(value));
	},
});
const selected = defineModel<IOption>("selected");

function getSelected(value = props.modelValue) {
	const { optionValue } = props;
	return props.options.find((option) => option[optionValue as keyof typeof option] === value);
}

watch(() => props.modelValue, () => selected.value = getSelected(), {
	immediate: true,
});
</script>
