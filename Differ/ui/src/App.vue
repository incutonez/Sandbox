<template>
  <article class="flex h-full w-full">
    <AGTable class="flex-1" />
  </article>
</template>

<script setup lang="ts">
import AGTable from "@/components/AGTable.vue";
import { getDiff } from "./api/diff";

getDiff();
</script>
