<template>
	<BaseDialog :title="`Delete ${entityName}?`">
		<template #body>
			<p>Are you sure you want to delete {{ entityName }}?</p>
		</template>
		<template #afterCancel>
			<BaseButton
				text="Delete"
				:loading="loading"
				@click="onClickDelete"
			/>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";

interface IProps {
	entityName?: string;
	loading?: boolean;
}

defineProps<IProps>();
const emit = defineEmits(["delete"]);

function onClickDelete() {
	emit("delete");
}
</script>
