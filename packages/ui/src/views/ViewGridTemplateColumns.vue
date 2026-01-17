<script setup lang="ts">
/**
 * This is an example of how to add a dynamic grid-template-columns based on the size of items.  It's useful in
 * scenarios where maybe a row does not have an ending element (like a button), but you'd like to line it up perfectly
 * with rows below it that do have an ending element.  Basically just preserve space at the end.
 */
import { faker } from "@faker-js/faker";

const Sections = [faker.word.words(2).split(/\s/), faker.word.words(2).split(/\s/), faker.word.words(4).split(/\s/), faker.word.words(4).split(/\s/)];

function getSectionRootClass(index: number) {
	return {
		[`grid template-preserve-space bg-gray-${index + 1}00 p-4`]: true,
	};
}
</script>

<template>
	<article class="flex flex-col gap-4">
		<section
			v-for="(sectionRoot, index) in Sections"
			:key="index"
			:class="getSectionRootClass(index)"
			:style="`--group-size: ${sectionRoot.length};`"
		>
			<div
				v-for="section in sectionRoot"
				:key="section"
				class="invert mix-blend-difference"
			>
				{{ section }}
			</div>
			<button v-if="index % 2 === 1">
				Click!
			</button>
		</section>
	</article>
</template>

<style scoped>
.template-preserve-space {
  grid-template-columns: repeat(var(--group-size), minmax(0, 1fr)) 4rem;
}
</style>
