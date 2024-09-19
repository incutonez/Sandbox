<template>
	<FieldComboBox
		:options="WorldColors"
		option-label="displayName"
		label-cls="w-20"
	/>
</template>

<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { WorldColors } from "@/enums/game/WorldColors";
</script>
