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
    <section class="flex items-center text-sm font-semibold leading-6">
      <AvatarUser class="mr-1 h-5 w-5" />
      <span>{{ params.meta.username }} {{ changesText }}</span>
    </section>
    <section class="text-xs font-semibold leading-5 text-slate-500">
      {{ dateTime(params.meta.date) }}
    </section>
  </article>
</template>

<script setup lang="ts">
import AvatarUser from "@/components/AvatarUser.vue";
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
  const count = [];
  const { changes } = props.params.meta;
  for (const key in changes) {
    const value = changes[key as keyof typeof changes];
    const single = value === 1;
    if (!value) {
      continue;
    }
    switch (key) {
      case "create":
        count.push(`${value} ${single ? "addition" : "additions"}`);
        break;
      case "update":
        count.push(`${value} ${single ? "update" : "updates"}`);
        break;
      case "delete":
        count.push(`${value} ${single ? "deletion" : "deletions"}`);
        break;
    }
  }
  return `made ${count.join(", ")}`;
});
</script>
