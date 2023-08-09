<template>
  <article class="flex items-center space-x-2">
    <span>{{ params.data.value }}</span>
    <template v-if="params.data.previous !== undefined">
      <IconArrow />
      <span>{{ params.data.previous }}</span>
    </template>
  </article>
</template>

<script setup lang="ts">
import IconArrow from "@/components/IconArrow.vue";
import type { ITreeRow } from "@/types/components";

interface IPropsAGTableValue {
  params: {
    data: ITreeRow;
  }
}

defineProps<IPropsAGTableValue>();
</script>
