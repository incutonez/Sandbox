<template>
	<article class="flex h-full">
		<nav class="flex h-full w-64 flex-col border-r border-red-700 bg-red-200 p-4">
			<a
				class="hover:text-select-600 cursor-pointer"
				:class="selected === RouteModelingClassValidatorView ? 'text-sky-700 font-semibold' : ''"
				@click="onClickViewClassValidator"
			>Class Validator</a>
			<a
				class="hover:text-select-600 cursor-pointer"
				:class="selected === RouteModelingTypeBoxView ? 'text-sky-700 font-semibold' : ''"
				@click="onClickViewTypeBox"
			>TypeBox</a>
			<a
				class="hover:text-select-600 cursor-pointer"
				:class="selected === RouteModelingZodView ? 'text-sky-700 font-semibold' : ''"
				@click="onClickViewZod"
			>Zod</a>
		</nav>
		<RouterView class="flex-1" />
	</article>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { RouteRecordName, useRoute } from "vue-router";
import {
	RouteModelingClassValidatorView,
	RouteModelingTypeBoxView, RouteModelingZodView,
	viewClassValidator,
	viewTypeBox,
	viewZod,
} from "@/router";

const selected = ref<RouteRecordName>();
const route = useRoute();

watch(route, ($route) => selected.value = $route.name ?? RouteModelingClassValidatorView, {
	immediate: true,
});

function onClickViewClassValidator() {
	viewClassValidator();
}

function onClickViewTypeBox() {
	viewTypeBox();
}

function onClickViewZod() {
	viewZod();
}
</script>
