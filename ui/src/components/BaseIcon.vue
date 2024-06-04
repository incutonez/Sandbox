<template>
	<Component :is="icon" />
</template>

<script setup lang="ts">
export interface IBaseIcon {
	icon: SVGElement | string;
}

defineProps<IBaseIcon>();
</script>
