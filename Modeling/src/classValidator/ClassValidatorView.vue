<template>
	<MainView />
</template>

<script setup lang="ts">
import { PersonModel } from "@/classValidator/PersonModel.ts";
import MainView from "@/components/MainView.vue";
import { usePersonProvider } from "@/personProvider.ts";

const { record } = usePersonProvider();
record.value = PersonModel.create({
	firstName: "Class",
	lastName: "Validator",
});
</script>
