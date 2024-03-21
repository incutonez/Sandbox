<template>
	<BaseDialog :title="`${actionUpper} ${entityName}?`">
		<template #body>
			<slot name="body">
				<p>Are you sure you want to {{ action.toLowerCase() }} {{ entityName }}?</p>
			</slot>
		</template>
		<template #afterCancel>
			<BaseButton
				:text="actionUpper"
				:loading="loading"
				@click="onClickConfirm"
			/>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";

interface IProps {
	entityName?: string;
	loading?: boolean;
	action?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	action: "",
	entityName: "",
});
const emit = defineEmits(["confirm"]);
const actionUpper = computed(() => {
	const { action = "" } = props;
	return `${action.charAt(0).toUpperCase() + action.substring(1)}`;
});

function onClickConfirm() {
	emit("confirm");
}
</script>
