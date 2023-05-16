<template>
  <article class="flex">
    <AGTable />
  </article>
</template>

<script setup lang="ts">
import AGTable from "@/components/AGTable.vue";
import { getDiff } from "./api/diff";

getDiff();
</script>
