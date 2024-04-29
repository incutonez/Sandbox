<template>
	<TableGrid
		ref="usersGrid"
		:columns="columns"
		:load="loadUsers"
		remote
		:remote-max="15"
		title="Users"
		:add-entity-config="addUserConfig"
	/>
	<RouterView @saved="onSavedUser" />
	<DialogConfirm
		v-model="showDelete"
		:entity-name="selectedRecord?.name"
		action="Delete"
		:loading="deleting"
		@confirm="onDeleteUser"
	/>
	<DialogConfirm
		v-model="showCopy"
		:entity-name="selectedRecord?.name"
		action="Copy"
		:loading="copying"
		@confirm="onCopyUser"
	/>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { ApiPaginatedRequest } from "@incutonez/spec/dist";
import IconCopy from "@/assets/IconCopy.vue";
import IconDelete from "@/assets/IconDelete.vue";
import IconEdit from "@/assets/IconEdit.vue";
import BaseButton from "@/components/BaseButton.vue";
import DialogConfirm from "@/components/DialogConfirm.vue";
import TableCellActions, { ITableCellActions } from "@/components/TableCellActions.vue";
import TableGrid from "@/components/TableGrid.vue";
import { UserModel } from "@/models/UserModel";
import { viewUser, viewUsers } from "@/router";
import { IBaseButton } from "@/types/components";
import { ITableColumn } from "@/types/table";
import { useColumnIndex } from "@/views/shared/columns";

const showDelete = ref(false);
const showCopy = ref(false);
const deleting = ref(false);
const copying = ref(false);
const usersGrid = ref<InstanceType<typeof TableGrid>>();
const selectedRecord = ref<UserModel>();
const addUserConfig: IBaseButton = {
	text: "User",
	onClick() {
		viewUser();
	},
};
const columns: ITableColumn[] = [
	// TODOJEF: Need to fix this in the eslint plugin because it thinks the function call should have a newline
	// eslint-disable-next-line
	useColumnIndex(), {
		lock: "left",
		title: "Actions",
		titleAlign: "center",
		showMenu: false,
		cellComponent: TableCellActions,
		cellParams(record: UserModel) {
			return {
				actions: [{
					title: "Edit",
					icon: IconEdit,
					onClick() {
						viewUser(record.id!);
					},
				}, {
					title: "Copy",
					icon: IconCopy,
					async onClick() {
						selectedRecord.value = record;
						showCopy.value = true;
					},
				}, {
					title: "Delete",
					icon: IconDelete,
					onClick() {
						selectedRecord.value = record;
						showDelete.value = true;
					},
				}],
			} as ITableCellActions;
		},
	}, {
		field: "firstName",
		title: "First Name",
		cls: "min-w-32",
		lock: "left",
	}, {
		field: "lastName",
		title: "Last Name",
		cls: "min-w-32",
		lock: "left",
	}, {
		field: "phone",
		title: "Phone",
	}, {
		field: "email",
		title: "Email",
	}, {
		field: "gender",
		title: "Gender",
	}, {
		field: "birthDate",
		title: "Birth Date",
	}, {
		cellComponent: BaseButton,
		cellParams(data: any) {
			return {
				text: data.email,
			};
		},
	},
];

async function loadUsers(params: ApiPaginatedRequest) {
	return UserModel.readAll(params);
}

async function onDeleteUser() {
	const $selectedRecord = unref(selectedRecord);
	if ($selectedRecord) {
		deleting.value = true;
		await $selectedRecord.delete();
		deleting.value = false;
		showDelete.value = false;
		await usersGrid.value!.reloadRecords();
	}
}

async function onCopyUser() {
	const $selectedRecord = unref(selectedRecord);
	if ($selectedRecord) {
		copying.value = true;
		const response = await $selectedRecord.copy();
		copying.value = false;
		showCopy.value = false;
		await viewUser(response.id);
	}
}

function onSavedUser() {
	viewUsers();
	usersGrid.value!.reloadRecords();
}
</script>
