<template>
	<BaseField>
		<span>{{ value }}</span>
	</BaseField>
</template>

<script setup lang="ts">
import BaseField from "@/components/BaseField.vue";

interface IProps {
	value?: string;
}
defineProps<IProps>();
</script>
