<template>
	<BaseField v-bind="$props">
		<span>{{ value }}</span>
	</BaseField>
</template>

<script setup lang="ts">
import BaseField, { IBaseField } from "@/components/BaseField.vue";

interface IProps extends IBaseField {
	value?: string;
}
defineProps<IProps>();
</script>
