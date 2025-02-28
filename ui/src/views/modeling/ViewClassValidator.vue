<script setup lang="ts">
import BaseView from "@/views/modeling/BaseView.vue";
import { PersonModel } from "@/views/modeling/classValidator/PersonModel";
import { providePerson } from "@/views/modeling/personProvider";

const { record } = providePerson();
record.value = PersonModel.create({
	firstName: "Class",
	lastName: "Validator",
});
</script>

<template>
	<BaseView />
</template>
