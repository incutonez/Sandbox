<template>
	<PrimeDialog
		v-model:visible="show"
		:modal="modal"
		:content-class="bodyCls"
		:closable="false"
		:close-on-escape="false"
		@keydown.esc="onKeyEscape"
	>
		<template #header>
			<slot name="header">
				<h2 v-if="!!title">
					{{ title }}
				</h2>
			</slot>
			<BaseButton
				:icon="IconCancel"
				:plain="true"
				class="ml-auto !p-0 hover:fill-red-800"
				icon-cls="size-5"
				@click="onClickCloseButton"
			/>
		</template>
		<template #default>
			<slot name="body" />
		</template>
		<template #footer>
			<slot name="footer">
				<slot name="beforeCancel" />
				<BaseButton
					text="Cancel"
					:icon="IconCancel"
					@click="onCancel"
				/>
				<slot name="afterCancel" />
			</slot>
		</template>
	</PrimeDialog>
</template>

<script setup lang="ts">
import PrimeDialog from "primevue/dialog";
import IconCancel from "@/assets/IconCancel.vue";
import BaseButton from "@/components/BaseButton.vue";

interface IProps {
	title?: string;
	modal?: boolean;
	bodyCls?: string;
}

withDefaults(defineProps<IProps>(), {
	modal: true,
	title: undefined,
	bodyCls: undefined,
});
const emit = defineEmits(["close", "click-cancel"]);
const show = defineModel<boolean>("modelValue", {
	default: false,
});

function close() {
	show.value = false;
}

function cancel() {
	close();
	emit("click-cancel");
}

function onCancel() {
	cancel();
}

function onKeyEscape() {
	cancel();
}

function onClickCloseButton() {
	cancel();
}

defineExpose({
	close,
	cancel,
});
</script>
