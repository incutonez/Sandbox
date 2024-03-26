<template>
	<TableColumn v-bind="getColumnProps(props)" />
</template>

<script setup lang="ts">
/**
 * We can't create a custom wrapper column component yet.  Looks like it should be fixed in 3.48.0
 * Source: https://github.com/primefaces/primevue/issues/4940
 */
import TableColumn from "primevue/column";
import { getColumnProps } from "@/components/table";
import { ITableColumn } from "@/types/table";

const props = defineProps<ITableColumn>();
</script>
