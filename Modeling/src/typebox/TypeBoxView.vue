<template>
	<MainView />
</template>

<script setup lang="ts">
import MainView from "@/components/MainView.vue";
import { usePersonProvider } from "@/personProvider.ts";
import { PersonModel } from "@/typebox/PersonModel.ts";

const { record } = usePersonProvider();
record.value = PersonModel.create({
	firstName: "Type",
	lastName: "Box",
});
</script>
