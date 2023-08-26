<template>
  <article class="flex h-full w-full">
    <AGTable
      v-if="differ"
      class="flex-1"
      :items="diffRecords"
    />
    <AGTable
      v-else
      :items="items"
      class="flex-1"
      server-paging
      @load="onLoadData"
    />
  </article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { IServerSideGetRowsParams } from "ag-grid-community";
import { diffRecords, getDiff } from "@/api/diff";
import { getRandomData } from "@/api/random";
import AGTable from "@/components/AGTable.vue";

const differ = false;
const items = ref<any>([]);
if (differ) {
  void getDiff();
}

async function onLoadData(params: IServerSideGetRowsParams) {
  console.log("should load");
  params.success({
    rowData: await getRandomData() as any,
    rowCount: 100,
  });
}
</script>
