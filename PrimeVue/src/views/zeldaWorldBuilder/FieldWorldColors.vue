<template>
	<FieldComboBox
		:options="WorldColors"
		option-label="displayName"
	/>
</template>

<script setup lang="ts">
import FieldComboBox from "@/components/FieldComboBox.vue";
import { WorldColors } from "@/enums/zelda/WorldColors";
</script>
