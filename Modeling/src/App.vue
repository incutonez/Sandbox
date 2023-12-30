<template>
	<main>
		<input v-model="record.firstName" />
		<input v-model="record.lastName" />
		<span>{{ record.name() }}</span>
	</main>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useModel } from "@/typebox/BaseModel.ts";
import { IPerson } from "@/typebox/IPerson.ts";

const record = reactive(useModel(IPerson));
record.firstName = "John";
record.lastName = "Smith";
console.log(record.isValid(), record.name());
</script>
