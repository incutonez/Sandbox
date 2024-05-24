<template>
	<BaseView />
</template>

<script setup lang="ts">
import BaseView from "@/views/modeling/BaseView.vue";
import { providePerson } from "@/views/modeling/personProvider";
import { PersonModel } from "@/views/modeling/typebox/PersonModel";

const { record } = providePerson();
record.value = PersonModel.create({
	firstName: "Type",
	lastName: "Box",
});
</script>
