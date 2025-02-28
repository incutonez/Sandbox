<script setup lang="ts">
import BaseView from "@/views/modeling/BaseView.vue";
import { providePerson } from "@/views/modeling/personProvider";
import { PersonModel } from "@/views/modeling/zod/PersonModel";

const { record } = providePerson();
record.value = PersonModel.create({
	firstName: "Zod",
	lastName: "",
});
</script>

<template>
	<BaseView />
</template>
