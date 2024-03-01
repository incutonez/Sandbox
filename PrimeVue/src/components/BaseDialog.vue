<template>
	<PrimeDialog
		v-model:visible="show"
		:modal="modal"
		@hide="onClose"
	>
		<template #header>
			<slot name="header">
				<h2 v-if="!!title">
					{{ title }}
				</h2>
			</slot>
		</template>
		<template #default>
			<slot name="body" />
		</template>
		<template #footer>
			<slot name="footer">
				<BaseButton
					text="Cancel"
					@click="onCancel"
				/>
				<slot name="afterCancel" />
			</slot>
		</template>
	</PrimeDialog>
</template>

<script setup lang="ts">
import PrimeDialog from "primevue/dialog";
import BaseButton from "@/components/BaseButton.vue";

interface IProps {
	title?: string;
	modal?: boolean;
}

withDefaults(defineProps<IProps>(), {
	modal: true,
	title: undefined,
});
const emit = defineEmits(["close", "cancel"]);
const show = defineModel<boolean>("modelValue", {
	default: false,
});

function onCancel() {
	show.value = false;
	emit("cancel");
}

function onClose() {
	emit("close");
}
</script>
