<template>
	<main class="p-4 flex flex-col">
		<article class="flex mb-2">
			<a
				v-for="section in sections"
				:key="section"
				class="bg-slate-500 text-white py-2 px-4 first:rounded-tl-lg last:rounded-tr-lg cursor-pointer border border-slate-500 hover:bg-slate-600"
				:class="activeSection === section ? '!bg-white !text-slate-600' : ''"
				@click="activeSection = section"
			>{{ section }}</a>
		</article>
		<ClassValidatorView v-show="activeSection === 'Class Validator'" />
		<TypeBoxView v-show="activeSection === 'TypeBox'" />
		<ZodView v-show="activeSection === 'Zod'" />
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ClassValidatorView from "@/classValidator/ClassValidatorView.vue";
import TypeBoxView from "@/typebox/TypeBoxView.vue";
import ZodView from "@/zod/ZodView.vue";

const sections = ["Class Validator", "TypeBox", "Zod", "Vee Validate"];
const activeSection = ref(sections[0]);
console.log(activeSection);
</script>
