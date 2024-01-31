<template>
	<PrimeButton
		:label="text"
		:disabled="disabled"
	/>
</template>

<script setup lang="ts">
import PrimeButton from "primevue/button";
import { IButton } from "@/types/button.ts";

defineProps<IButton>();
</script>
