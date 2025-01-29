<template>
	<BaseDialog
		title="Import Users"
		class="h-64 w-96"
		body-cls="h-full"
		@close="onClickCancel"
	>
		<template #body>
			<input
				ref="fileField"
				type="file"
				class="hidden"
				accept="text/csv"
				@change="onSelectFiles"
			>
			<section
				class="flex h-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-slate-400 hover:border-red-700 [&>*]:pointer-events-none"
				@click="onClickSelectFiles"
				@dragenter="onDragEnter"
				@dragleave="onDragLeave"
				@dragover.prevent
				@drop.prevent="onDropFiles"
			>
				<section class="flex items-center">
					<IconDownload class="mr-1 size-8" />
					<p class="text-sm">
						Drag & Drop files or click to select
					</p>
				</section>
				<p class="text-sm text-gray-700">
					Allowed File Types:
				</p>
				<p class="text-sm font-semibold text-sky-700">
					csv
				</p>
			</section>
			<ViewUsersImport v-model="showViewUsers" />
		</template>
		<template #beforeCancel>
			<BaseButton
				text="Template"
				:icon="IconDownload"
				@click="onClickDownloadTemplate"
			/>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
// TODOJEF: Pick up here and add a preview grid for after when the file is parsed
import { ref } from "vue";
import MimeTypes from "mime-types";
import Papa from "papaparse";
import IconDownload from "@/assets/IconDownload.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import { IUserCSV, UserModel } from "@/models/UserModel";
import { viewUsers } from "@/router";
import { downloadFile } from "@/utils/common";
import { provideUsersImport } from "@/views/users/usersProvider";
import ViewUsersImport from "@/views/users/ViewUsersImport.vue";

const fileField = ref<HTMLInputElement>();
const { users } = provideUsersImport();
const showViewUsers = ref(false);

function onDragEnter({ target }: DragEvent) {
	(target as HTMLElement).classList.add("drop-hover");
}

function onDragLeave({ target }: DragEvent) {
	(target as HTMLElement).classList.remove("drop-hover");
}

function onDropFiles({ target, dataTransfer }: DragEvent) {
	(target as HTMLElement).classList.remove("drop-hover");
	const [file] = dataTransfer?.files ?? [];
	parseFile(file);
}

function onSelectFiles() {
	const [file] = fileField.value?.files ?? [];
	parseFile(file);
}

function onClickSelectFiles() {
	fileField.value?.click();
}

function parseFile(file: File) {
	Papa.parse<IUserCSV>(file, {
		header: true,
		complete(results) {
			users.value = results.data.map((data) => {
				const birthDate = data["Birth Date"];
				const user = UserModel.create({
					firstName: data["First Name"],
					lastName: data["Last Name"],
					gender: data.Gender,
					phone: data.Phone,
					email: data.Email,
				});
				if (birthDate) {
					user.birthDate = new Date(birthDate).getTime();
				}
				return user;
			});
			showViewUsers.value = true;
		},
	});
}

function onClickDownloadTemplate() {
	const csv = Papa.unparse({
		fields: [
			"First Name",
			"Last Name",
			"Email",
			"Phone",
			"Birth Date",
			"Gender",
		],
		data: [],
	}, {
		header: true,
	});
	const csvData = new Blob([csv], {
		type: MimeTypes.lookup("csv") || "",
	});
	downloadFile(csvData, "users-template");
}

function onClickCancel() {
	viewUsers();
}
</script>

<style scoped lang="scss">
.drop-hover {
  border-color: var(--color-red-700) !important;
}
</style>
