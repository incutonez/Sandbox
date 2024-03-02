<template>
	<GridTable
		ref="usersGrid"
		:columns="columns"
		:load="loadUsers"
		remote
		:remote-max="15"
		title="Users"
		:add-entity-config="addUserConfig"
	/>
	<RouterView @saved="onSavedUser" />
	<DialogDelete
		v-model="showDelete"
		:entity-name="selectedRecord?.name"
		:loading="deleting"
		@delete="onDeleteUser"
	/>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import { ApiPaginatedRequest } from "@incutonez/api-spec/dist";
import { UserModel } from "@/api/models/UserModel.ts";
import IconCopy from "@/assets/IconCopy.vue";
import IconDelete from "@/assets/IconDelete.vue";
import IconEdit from "@/assets/IconEdit.vue";
import BaseButton from "@/components/BaseButton.vue";
import DialogDelete from "@/components/DialogDelete.vue";
import GridCellMenu, { IGridCellMenu } from "@/components/GridCellMenu.vue";
import GridTable from "@/components/GridTable.vue";
import { viewUser, viewUsers } from "@/router.ts";
import { IBaseButton } from "@/types/components.ts";
import { IGridColumn } from "@/types/dataTable.ts";
import { useColumnIndex } from "@/views/shared/columns.ts";

const showDelete = ref(false);
const deleting = ref(false);
const usersGrid = ref<InstanceType<typeof GridTable>>();
const selectedRecord = ref<UserModel>();
const addUserConfig: IBaseButton = {
	text: "User",
	onClick() {
		viewUser();
	},
};
const columns: IGridColumn[] = [
	useColumnIndex(),
	{
		lock: "left",
		showMenu: false,
		cellComponent: GridCellMenu,
		cellParams(record: UserModel) {
			return {
				menuConfig: {
					items: [
						{
							text: "Edit",
							icon: IconEdit,
							click() {
								viewUser(record.id!);
							},
						},
						{
							text: "Copy",
							icon: IconCopy,
						},
						{
							text: "Delete",
							icon: IconDelete,
							click() {
								selectedRecord.value = record;
								showDelete.value = true;
							},
						},
					],
				},
			} as IGridCellMenu;
		},
	},
	{
		field: "firstName",
		title: "First Name",
		cls: "min-w-32",
		lock: "left",
	},
	{
		field: "lastName",
		title: "Last Name",
		cls: "min-w-32",
		lock: "left",
	},
	{
		field: "phone",
		title: "Phone",
	},
	{
		field: "email",
		title: "Email",
	},
	{
		field: "gender",
		title: "Gender",
	},
	{
		field: "birthDate",
		title: "Birth Date",
	},
	{
		cellComponent: BaseButton,
		cellParams(data: any) {
			return {
				text: data.email,
			};
		},
	},
];

async function loadUsers(params: ApiPaginatedRequest) {
	return UserModel.list(params);
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

function onSavedUser() {
	viewUsers();
	usersGrid.value!.reloadRecords();
}
</script>
