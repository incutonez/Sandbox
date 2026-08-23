<script setup lang="ts">
import {
	columnFilteringFeature,
	columnVisibilityFeature,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFns,
	rowPaginationFeature,
	rowSortingFeature,
	sortFns,
	tableFeatures,
	useTable,
} from "@tanstack/vue-table";
import TableData from "@/components/TableData.vue";
import { type UserModel, useUsersGet } from "@/composables/users.ts";

const features = tableFeatures({
	columnFilteringFeature,
	rowPaginationFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	sortedRowModel: createSortedRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortFns,
	filterFns,
	columnVisibilityFeature,
});
const { accessor, columns } = createColumnHelper<typeof features, UserModel>();
const { userRecords, loadingUsers } = useUsersGet();
const table = useTable({
	features,
	data: userRecords,
	columns: columns([{
		id: "fullName",
		header: "Full Name",
		accessorFn({ firstName, lastName }) {
			return `${firstName} ${lastName}`;
		},
	}]),
});
</script>

<template>
  <article>
    <TableData :table="table" />
  </article>
</template>
