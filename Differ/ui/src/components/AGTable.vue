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
      :row-model-type="serverPaging ? 'serverSide' : 'clientSide'"
      :row-data="serverPaging ? undefined : records"
      :get-data-path="getDataPath"
      :auto-group-column-def="autoGroupColumnDef"
      :column-defs="columnDefs"
      :default-col-def="defaultColDef"
      :is-external-filter-present="isExternalFilterPresent"
      :does-external-filter-pass="doesExternalFilterPass"
      :get-row-class="getRowClass"
      suppress-row-hover-highlight
      suppress-cell-selection
      :tree-data="!serverPaging"
      :pagination="serverPaging"
      :pagination-page-size="20"
      @grid-ready="onGridReady"
      @pagination-changed="onPaginationChanged"
    />
  </article>
</template>

<script setup lang="ts">
import AGTableField from "@/components/AGTableField.vue";
import AGTableStatus from "@/components/AGTableStatus.vue";
import AGTableValue from "@/components/AGTableValue.vue";
import { ref, watch } from "vue";
import { ChangeStatus, DiffGet200ResponseInner } from "shared-differ";
import {
  ColSpanParams,
  GridApi,
  GridReadyEvent,
  ICellRendererParams, IRowNode, IServerSideGetRowsParams, PaginationChangedEvent,
} from "ag-grid-community";
import { AgGridVue } from "ag-grid-vue3";
import { IPropsAGTable, ITreeRow, ITreeRowMeta } from "@/types/components";

const props = defineProps<IPropsAGTable>();
const emit = defineEmits(["load"]);
const records = ref<ITreeRow[]>();
const metadata = ref<ITreeRowMeta[]>();
const gridApi = ref<GridApi<ITreeRow>>();
const showUnchanged = ref(false);
const defaultColDef = {
  flex: 1,
};
const columnDefs = [];
if (props.serverPaging) {
  columnDefs.push({
    headerName: "Name",
    field: "name",
  });
}
else {
  columnDefs.push({
    headerName: "Value",
    field: "value",
    cellClass: "p-0 pl-2 [&>*]:!p-0 [&>*]:!m-0 flex",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      innerRendererSelector({ data }: ICellRendererParams<ITreeRow>) {
        return {
          component: AGTableValue,
          params: {
            data: data,
          },
        };
      },
    },
  }, {
    headerName: "",
    field: "status",
    pinned: "right",
    maxWidth: 40,
    cellClass: "p-0 [&>*]:!p-0 [&>*]:!m-0 flex justify-center",
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: {
      innerRendererSelector({ data }: ICellRendererParams<ITreeRow>) {
        return {
          component: AGTableStatus,
          params: {
            status: data?.status,
          },
        };
      },
    },
  });
}
const autoGroupColumnDef = {
  headerName: "Field",
  field: "field",
  maxWidth: 400,
  autoHeight: true,
  resizable: true,
  colSpan({ node }: ColSpanParams) {
    return node?.level === 0 ? 3 : 1;
  },
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

function isExternalFilterPresent() {
  return !showUnchanged.value;
}

function getRowClass({ data }: IRowNode<ITreeRow>) {
  switch (data?.status) {
    case ChangeStatus.Created:
      return "bg-blue-50";
    case ChangeStatus.Updated:
      return "bg-orange-50";
    case ChangeStatus.Deleted:
      return "bg-red-50";
  }
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

function flatten({ value, previous, status, field }: ITreeRow, path: (string | number)[], output: ITreeRow[], meta: ITreeRowMeta) {
  if (Array.isArray(value) && value.length) {
    value.forEach((cell) => flatten(cell, [...path, field], output, meta));
    return;
  }
  switch (status) {
    case ChangeStatus.Created:
      meta.changes.create++;
      break;
    case ChangeStatus.Updated:
      meta.changes.update++;
      break;
    case ChangeStatus.Deleted:
      meta.changes.delete++;
      break;
    case ChangeStatus.Unchanged:
      break;
  }
  output.push({
    field,
    status,
    value,
    previous,
    path: [...path, field],
  });
}

function processData(items?: DiffGet200ResponseInner[]) {
  const output: ITreeRow[] = [];
  const meta: ITreeRowMeta[] = [];
  items?.forEach(({ items, date = Date.now(), username = "" }, index) => {
    const metaItem = {
      index,
      date,
      username,
      changes: {
        create: 0,
        update: 0,
        delete: 0,
      },
    };
    meta.push(metaItem);
    items?.forEach((row) => flatten(row, [index], output, metaItem));
  });
  records.value = output;
  metadata.value = meta;
}

function onGridReady({ api }: GridReadyEvent) {
  gridApi.value = api;
  if (props.serverPaging) {
    api.setServerSideDatasource({
      getRows(params: IServerSideGetRowsParams) {
        // TODOJEF: This is where we need to fire the event and use params.success
        console.log("getRows", params.request.startRow, params.request.endRow);
        emit("load", params);
      },
    });
  }
}

function onPaginationChanged(event: PaginationChangedEvent) {
  // TODOJEF: I don't think we need this?
}

watch(() => props.items, (items) => {
  if (props.serverPaging) {
    console.log("changed", items);
    gridApi.value?.refreshServerSide({
      route: undefined,
      purge: true,
    });
  }
  else {
    console.log(items);
    processData(items);
  }
}, {
  immediate: true,
});
watch(showUnchanged, () => gridApi.value?.onFilterChanged());
</script>

<style scoped>
:deep(.ag-row-odd:not([class*="bg-"])) {
  background-color: white;
}
</style>
