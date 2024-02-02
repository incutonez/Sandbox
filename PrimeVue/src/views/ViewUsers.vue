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
import BaseButton from "@/components/BaseButton.vue";
import GridCellMenu, { IGridCellMenu } from "@/components/GridCellMenu.vue";
import GridTable from "@/components/GridTable.vue";
import Data from "@/MOCK_DATA.json";
import { IGridColumn } from "@/types/dataTable.ts";

const columns: IGridColumn[] = [
	{
		field: "firstName",
		title: "First Name",
	},
	{
		field: "lastName",
		title: "Last Name",
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
	{
		cellComponent: GridCellMenu,
		cellParams: {
			menuConfig: {
				items: [
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
];

getUsers();
</script>
