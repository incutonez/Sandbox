<template>
	<FieldBase>
		<span>{{ value }}</span>
	</FieldBase>
</template>

<script setup lang="ts">
import FieldBase from "@/components/FieldBase.vue";

interface IProps {
	value: string | boolean | number | undefined;
}

defineProps<IProps>();
</script>
