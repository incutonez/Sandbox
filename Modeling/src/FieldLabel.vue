<template>
	<label class="text-gray-500 uppercase text-xs font-semibold flex">
		<span>{{ text }}</span>
		<span
			class="text-red-600 text-xs lowercase"
			v-if="required"
		>&nbsp;*</span>
	</label>
</template>

<script setup lang="ts">
interface IProps {
	text: string;
	required?: boolean;
}

defineProps<IProps>();
</script>
