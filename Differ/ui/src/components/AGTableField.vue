<template>
  <article v-if="params.data">
    {{ params.data.field }}
  </article>
  <span v-else-if="params.node.level">
    {{ params.node.key }}
  </span>
  <article
    v-else-if="params.meta"
    class="flex flex-col place-content-center"
  >
    <section class="text-sm font-semibold">
      {{ params.meta.username }} {{ changesText }}
    </section>
    <section class="text-xs font-semibold leading-6 text-slate-500">
      {{ dateTime(params.meta.date) }}
    </section>
  </article>
</template>

<script setup lang="ts">
import { ITreeRow, ITreeRowMeta } from "@/types/components";
import { dateTime } from "@/utilities/date";
import { ICellRendererParams } from "ag-grid-community";
import { computed } from "vue";

interface ICellParams extends ICellRendererParams<ITreeRow> {
  meta: ITreeRowMeta;
}

interface IPropsAGTableField {
  params: ICellParams;
}
const props = defineProps<IPropsAGTableField>();
const changesText = computed(() => {
  const { allChildrenCount } = props.params.node;
  const text = allChildrenCount === 1 ? "change" : "changes";
  return `made ${allChildrenCount} ${text}`;
});
</script>
