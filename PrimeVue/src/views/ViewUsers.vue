<template>
	<GridTable
		:records="Data"
		:columns="columns"
	/>
</template>

<script setup lang="ts">
import { getUsers } from "@/api/users.ts";
import IconCopy from "@/assets/IconCopy.vue";
import IconDelete from "@/assets/IconDelete.vue";
import IconEdit from "@/assets/IconEdit.vue";
import BaseButton from "@/components/BaseButton.vue";
import GridCellMenu, { IGridCellMenu } from "@/components/GridCellMenu.vue";
import GridTable from "@/components/GridTable.vue";
import Data from "@/MOCK_DATA.json";
import { IGridColumn } from "@/types/dataTable.ts";

const columns: IGridColumn[] = [
	{
		lock: "left",
		showMenu: false,
		cellComponent: GridCellMenu,
		cellParams: {
			menuConfig: {
				items: [
					{
						text: "Edit",
						icon: IconEdit,
					},
					{
						text: "Copy",
						icon: IconCopy,
					},
					{
						text: "Delete",
						icon: IconDelete,
					},
				],
			},
		} as IGridCellMenu,
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

getUsers();
</script>
