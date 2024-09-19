<template>
	<BaseField v-bind="$props">
		<section class="relative flex-1">
			<PrimeInputText
				ref="libCmp"
				v-model="modelValue"
				:class="inputCls"
				:type="type"
				:disabled="disabled"
				@keyup="onKeyUp"
			/>
			<BaseButton
				v-if="clearVisible"
				tabindex="-1"
				class="absolute right-0 top-1.5"
				unstyled
				:icon="IconClear"
				icon-cls="h-5 w-6 fill-gray-600 hover:fill-red-700"
				@click="onClickClear"
			/>
		</section>
	</BaseField>
</template>

<script setup lang="ts">
import { computed, InputTypeHTMLAttribute, onMounted, ref } from "vue";
import PrimeInputText from "primevue/inputtext";
import IconClear from "@/assets/IconClear.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseField, { IBaseField } from "@/components/BaseField.vue";

interface IFieldText extends IBaseField {
	showClear?: boolean;
	disabled?: boolean;
	type?: InputTypeHTMLAttribute;
	/**
	 * Number of ms to delay before firing inputEnd event
	 */
	delay?: number;
	inputWidth?: string;
	autoFocus?: boolean;
}

const props = withDefaults(defineProps<IFieldText>(), {
	showClear: true,
	type: "text",
	delay: 300,
	inputWidth: "w-full",
});
const emit = defineEmits(["inputEnd", "inputClear"]);
const modelValue = defineModel<string>();
let inputEndTimer: ReturnType<typeof setTimeout>;
const libCmp = ref<InstanceType<typeof PrimeInputText>>();
const clearVisible = computed(() => props.showClear && !!modelValue.value);
const inputCls = computed(() => {
	return {
		"pr-6": props.showClear,
		[props.inputWidth]: true,
	};
});

function onClickClear() {
	modelValue.value = undefined;
	emit("inputClear");
}

function onKeyUp() {
	clearTimeout(inputEndTimer);
	inputEndTimer = setTimeout(() => emit("inputEnd"), props.delay);
}

onMounted(() => {
	if (props.autoFocus) {
		libCmp.value?.$el.focus();
	}
});
</script>
