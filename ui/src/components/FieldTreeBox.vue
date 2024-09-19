<script setup lang="ts">
import { computed } from "vue";
import PrimeTreeSelect from "primevue/treeselect";
import BaseField, { IBaseField } from "@/components/BaseField.vue";
import { ITreeOption } from "@/types/components";

export type IFieldTreeBoxSelection = Record<string, boolean>;

export interface IFieldTreeBox extends IBaseField {
	options?: ITreeOption[];
	optionLabel?: string | undefined;
	optionValue?: string | undefined;
	disabled?: boolean;
	showClear?: boolean;
	valueOnly?: boolean;
	modelValue?: string | IFieldTreeBoxSelection;
}

const props = withDefaults(defineProps<IFieldTreeBox>(), {
	optionLabel: "label",
	optionValue: "key",
	valueOnly: true,
	modelValue: undefined,
	options: () => [],
});
const emit = defineEmits(["update:modelValue"]);
const selected = defineModel<ITreeOption>("selected");
const model = computed({
	get() {
		const { modelValue } = props;
		if (typeof modelValue === "string") {
			// The TreeSelect expects a specific key-value pair, which is weird
			return {
				[modelValue]: true,
			};
		}
		return modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
		const selections = Object.keys(value ?? {});
		selected.value = getSelected(props.options, selections[0]);
	},
});

function getSelected(options: ITreeOption[], value: string): ITreeOption | undefined {
	const { optionValue } = props;
	return options.find((option) => {
		if (option[optionValue as keyof typeof option] === value) {
			return option;
		}
		else if (option.children) {
			return getSelected(option.children, value);
		}
	});
}
</script>

<template>
	<BaseField v-bind="$props">
		<PrimeTreeSelect
			v-bind="$props"
			v-model="model"
		/>
	</BaseField>
</template>
