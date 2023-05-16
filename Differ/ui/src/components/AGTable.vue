<template>
  <AgGridVue
    class="ag-theme-alpine"
    :row-data="records"
    :get-data-path="getDataPath"
    :auto-group-column-def="autoGroupColumnDef"
    :column-defs="columnDefs"
    :default-col-def="defaultColDef"
    tree-data
    @grid-ready="onGridReady"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { diffRecords } from "../api/diff";
import { DiffGet200ResponseInner, DiffModel } from "shared-differ";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";

const records = ref<ITreeRow[]>();
const gridApi = ref<GridApi<ITreeRow>>();
const defaultColDef = {
  flex: 1,
};
const columnDefs = [{
  headerName: "Value",
  field: "value",
}, {
  headerName: "Status",
  field: "status",
}];
const autoGroupColumnDef = {
  headerName: "Field",
  field: "field",
  width: 300,
  cellRendererParams: {
    suppressCount: true,
  },
};

interface ITreeRow extends DiffModel {
  path?: (string | number)[];
}

function getDataPath(row: ITreeRow) {
  return row.path;
}

function flatten({ value, previous, status, field }: ITreeRow, path: (string | number)[], output: ITreeRow[]) {
  if (Array.isArray(value) && value.length) {
    value.forEach((cell) => flatten(cell, [...path, field], output));
  }
  else {
    if (previous !== undefined) {
      value = `${value} => ${previous}`;
    }
    output.push({
      field,
      status,
      value,
      path: [...path, field],
    });
  }
}

function processData(items?: DiffGet200ResponseInner[]) {
  const output: ITreeRow[] = [];
  items?.forEach((item, index) => item.items?.forEach((row) => flatten(row, [index], output)));
  records.value = output;
}

function onGridReady(event: GridReadyEvent) {
  gridApi.value = event.api;
}

watchEffect(() => processData(diffRecords.value));
</script>
