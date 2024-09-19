<script setup lang="ts">
import { ref, unref } from "vue";
import IconSave from "@/assets/IconSave.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import { GameOverworld } from "@/models/GameOverworld";

const emit = defineEmits(["click-save"]);
const viewRecord = defineModel<GameOverworld>("record", {
	default: GameOverworld.create(),
});
const rootCmp = ref<InstanceType<typeof BaseDialog>>();

async function onClickSave() {
	const $viewRecord = unref(viewRecord);
	if (await $viewRecord.isValid()) {
		emit("click-save", viewRecord.value);
		rootCmp.value?.close();
	}
}
</script>

<template>
	<BaseDialog
		ref="rootCmp"
		title="Add Overworld"
		@keydown.enter="onClickSave"
	>
		<template #body>
			<section class="flex flex-col space-y-2">
				<FieldText
					v-model="viewRecord.Name"
					label="Name"
					auto-focus
				/>
				<FieldNumber
					v-model="viewRecord.Spawn.SceneX"
					label="Spawn X"
				/>
				<FieldNumber
					v-model="viewRecord.Spawn.SceneY"
					label="Spawn Y"
				/>
				<FieldComboBox
					v-model="viewRecord.Spawn.Name"
					:options="viewRecord.Children"
					option-value="Name"
					option-label="Name"
					label="Spawn Screen"
				/>
			</section>
		</template>
		<template #afterCancel>
			<BaseButton
				text="Save"
				:icon="IconSave"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>
