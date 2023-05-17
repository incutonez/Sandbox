<template>
  <article class="flex flex-col">
    <label>
      <input
        v-model="showUnchanged"
        type="checkbox"
      >
      Show Unchanged
    </label>
    <AgGridVue
      class="ag-theme-alpine flex-1"
      :row-data="records"
      :get-data-path="getDataPath"
      :auto-group-column-def="autoGroupColumnDef"
      :column-defs="columnDefs"
      :default-col-def="defaultColDef"
      :get-row-height="getRowHeight"
      :get-row-class="getRowClass"
      :is-external-filter-present="isExternalFilterPresent"
      :does-external-filter-pass="doesExternalFilterPass"
      tree-data
      @grid-ready="onGridReady"
    />
  </article>
</template>

<script setup lang="ts">
import { diffRecords } from "@/api/diff";
import AGTableField from "@/components/AGTableField.vue";
import { ref, watch, watchEffect } from "vue";
import { ChangeStatus, DiffGet200ResponseInner } from "shared-differ";
import {
  GridApi,
  GridReadyEvent,
  ICellRendererParams, IRowNode,
  RowClassParams,
  RowHeightParams,
} from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";
import { ITreeRow, ITreeRowMeta } from "@/types/components";

const records = ref<ITreeRow[]>();
const metadata = ref<ITreeRowMeta[]>();
const gridApi = ref<GridApi<ITreeRow>>();
const showUnchanged = ref(false);
const defaultColDef = {
  flex: 1,
};
const columnDefs = [{
  headerName: "Value",
  field: "value",
}, {
  headerName: "Status",
  field: "statusDisplay",
}];
const autoGroupColumnDef = {
  headerName: "Field",
  field: "field",
  width: 300,
  cellClass: "[&>*]:h-full [&>*]:flex [&>*]:!items-center",
  cellRendererParams: {
    suppressCount: true,
    innerRendererSelector({ value }: ICellRendererParams) {
      return {
        component: AGTableField,
        params: {
          meta: metadata.value?.[value],
        },
      };
    },
  },
};

function getDataPath(row: ITreeRow) {
  return row.path;
}

function getRowHeight({ node }: RowHeightParams) {
  return node.level === 0 ? 50 : 42;
}

function getRowClass({ data }: RowClassParams<ITreeRow>) {
  switch (data?.status) {
    case ChangeStatus.Created:
      return "bg-blue-50";
    case ChangeStatus.Updated:
      return "bg-orange-50";
    case ChangeStatus.Deleted:
      return "bg-red-50";
    case ChangeStatus.Unchanged:
    default:
      return "";
  }
}

function isExternalFilterPresent() {
  return !showUnchanged.value;
}

function doesExternalFilterPass({ data }: IRowNode<ITreeRow>) {
  switch (data?.status) {
    case ChangeStatus.Created:
    case ChangeStatus.Updated:
    case ChangeStatus.Deleted:
      return true;
    default:
      return false;
  }
}

function flatten({ value, previous, status, field }: ITreeRow, path: (string | number)[], output: ITreeRow[]) {
  if (Array.isArray(value) && value.length) {
    value.forEach((cell) => flatten(cell, [...path, field], output));
  }
  else {
    if (previous !== undefined) {
      value = `${value} => ${previous}`;
    }
    let statusDisplay;
    switch (status) {
      case ChangeStatus.Created:
        statusDisplay = "Created";
        break;
      case ChangeStatus.Updated:
        statusDisplay = "Updated";
        break;
      case ChangeStatus.Deleted:
        statusDisplay = "Deleted";
        break;
      case ChangeStatus.Unchanged:
        statusDisplay = "Unchanged";
        break;
    }
    output.push({
      field,
      status,
      statusDisplay,
      value,
      path: [...path, field],
    });
  }
}

function processData(items?: DiffGet200ResponseInner[]) {
  const output: ITreeRow[] = [];
  const meta: ITreeRowMeta[] = [];
  items?.forEach(({ items, date = Date.now(), username = "" }, index) => {
    meta.push({
      index,
      date,
      username,
    });
    items?.forEach((row) => flatten(row, [index], output));
  });
  records.value = output;
  metadata.value = meta;
}

function onGridReady(event: GridReadyEvent) {
  gridApi.value = event.api;
}

watchEffect(() => processData(diffRecords.value));
watch(showUnchanged, () => gridApi.value?.onFilterChanged());
</script>

<style scoped>
:deep(.ag-row-odd:not([class*="bg-"])) {
  background-color: white;
}
</style>
