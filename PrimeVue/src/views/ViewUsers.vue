<template>
	<GridTable
		:records="Data"
		:columns="columns"
	/>
</template>

<script setup lang="ts">
import { getUsers } from "@/api/users.ts";
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
];

getUsers();
</script>
