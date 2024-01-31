<template>
	<span class="material-symbols-outlined">{{ icon }}</span>
</template>

<script setup lang="ts">
import { MaterialSymbol } from "material-symbols";

export interface IBaseIcon {
	icon: MaterialSymbol;
}

defineProps<IBaseIcon>();
</script>
