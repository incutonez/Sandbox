<template>
	<Component :is="icon" />
</template>

<script setup lang="ts">
export interface IBaseIcon {
	icon: InstanceType<any>;
}

defineProps<IBaseIcon>();
</script>
