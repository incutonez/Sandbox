<template>
  <AgGridVue />
</template>

<script setup lang="ts">
import { AgGridVue } from "@ag-grid-community/vue3";
import { watchEffect } from "vue";
import { diffRecords } from "../api/diff";
import { DiffGet200ResponseInner } from "shared-differ";

function processData(records?: DiffGet200ResponseInner[]) {
  console.log("here", records);
}

watchEffect(() => {
  processData(diffRecords.value);
});
</script>
