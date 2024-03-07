<template>
	<BaseDialog
		v-model="show"
		class="w-1/2"
		title="User"
		@cancel="onClose"
		@close="onClose"
	>
		<template #body>
			<article
				v-if="record"
				class="flex flex-wrap gap-4"
			>
				<FieldText
					v-model="record.firstName"
					label="First Name"
					class="grow"
				/>
				<FieldText
					v-model="record.lastName"
					label="Last Name"
					class="grow"
				/>
				<FieldText
					v-model="record.email"
					label="Email"
					class="grow"
				/>
				<FieldText
					v-model="record.phone"
					label="Phone"
					class="grow"
				/>
				<FieldDate
					v-model="record.birthDate"
					label="Birth Date"
					class="grow"
					timestamp
				/>
				<FieldText
					v-model="record.gender"
					label="Gender"
					class="grow"
				/>
			</article>
		</template>
		<template #afterCancel>
			<BaseButton
				text="Save"
				:loading="loading"
				@click="onClickSave"
			/>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDate from "@/components/FieldDate.vue";
import FieldText from "@/components/FieldText.vue";
import { UserModel } from "@/models/UserModel";
import { viewUsers } from "@/router";

interface IProps {
	userId?: string;
}

const props = defineProps<IProps>();
const emit = defineEmits(["saved"]);
const show = ref(true);
const record = ref(UserModel.create());
const loading = ref(false);

function onClose() {
	viewUsers();
}

async function loadRecord() {
	const { userId } = props;
	if (userId) {
		await record.value.load(userId);
	}
	else {
		record.value.clear();
	}
}

async function onClickSave() {
	loading.value = true;
	await record.value.save();
	loading.value = false;
	emit("saved");
}

watch(() => props.userId, () => loadRecord(), {
	immediate: true,
});
</script>
