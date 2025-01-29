<script setup lang="ts">
interface IPageHeader {
	title: string;
}

defineProps<IPageHeader>();
</script>

<template>
	<h1 class="page-header">
		{{ title }}
	</h1>
</template>

<style scoped lang="postcss">
@reference "../style.css";

.page-header {
  @apply text-2xl font-semibold;
  color: #182C62;
}
</style>
