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
	</BaseDialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { UserModel } from "@/api/models/UserModel.ts";
import { getUser } from "@/api/users.ts";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDate from "@/components/FieldDate.vue";
import FieldText from "@/components/FieldText.vue";
import { viewUsers } from "@/router.ts";

interface IProps {
	userId?: string;
}

const props = defineProps<IProps>();
const show = ref(true);
const record = ref(UserModel.create());

function onClose() {
	viewUsers();
}

async function loadRecord() {
	const { userId } = props;
	if (userId) {
		const response = await getUser(userId);
		record.value = UserModel.create(response);
	}
}

watch(() => props.userId, () => loadRecord(), {
	immediate: true,
});
</script>
