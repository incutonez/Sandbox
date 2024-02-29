<template>
	<article
		class="flex w-max"
		:class="cls"
	>
		<FieldLabel
			:text="label"
			:position="labelPosition"
		/>
		<section class="relative flex-1">
			<PrimeInputText
				v-model="modelValue"
				:class="inputCls"
				:type="type"
				:disabled="disabled"
				@keyup="onKeyUp"
			/>
			<BaseButton
				v-if="clearVisible"
				class="absolute right-0 top-1.5"
				unstyled
				@click="onClickClear"
			>
				<template #icon>
					<IconClear class="h-5 w-6 fill-gray-600 hover:fill-red-700" />
				</template>
			</BaseButton>
		</section>
	</article>
</template>

<script setup lang="ts">
import { computed, InputTypeHTMLAttribute } from "vue";
import PrimeInputText from "primevue/inputtext";
import IconClear from "@/assets/IconClear.vue";
import BaseButton from "@/components/BaseButton.vue";
import FieldLabel, { IFieldLabel } from "@/components/FieldLabel.vue";

interface IFieldText {
	label?: string;
	labelPosition?: IFieldLabel["position"];
	showClear?: boolean;
	disabled?: boolean;
	type?: InputTypeHTMLAttribute;
	/**
	 * Number of ms to delay before firing inputEnd event
	 */
	delay?: number;
	inputWidth?: string;
}

const props = withDefaults(defineProps<IFieldText>(), {
	label: undefined,
	labelPosition: "top",
	showClear: true,
	type: "text",
	delay: 300,
	inputWidth: "w-full",
});
const emit = defineEmits(["inputEnd", "inputClear"]);
const modelValue = defineModel<string>();
let inputEndTimer: ReturnType<typeof setTimeout>;
const clearVisible = computed(() => props.showClear && !!modelValue.value);
const cls = computed(() => {
	return {
		"flex-col": props.labelPosition === "top",
	};
});
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
</script>
