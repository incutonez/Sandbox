<template>
	<article class="flex flex-col">
		<h1 class="section-title">
			Relevant Experience
		</h1>
		<section class="flex flex-col space-y-4">
			<SectionJobDescription
				date-start="Mar 2023"
				project="Vue 3, TypeScript 5.x, Tailwind, Pinia, NestJS, OpenAPI"
				company="QAD Redzone"
				location="Remote"
				industry="Manufacturing Tech"
				position="Senior Web Engineer"
				date-end="Feb 2024"
				:tasks="QADTasks"
			/>
			<SectionJobDescription
				date-start="May 2022"
				project="Vue 3, TypeScript, Tailwind, C#"
				company="IntrinsiQ"
				location="Remote"
				industry="Health Tech"
				position="Software Developer (contractor)"
				date-end="Dec 2022"
				:tasks="IntrinsiQTasks"
			/>
			<SectionJobDescription
				date-start="Aug 2021"
				project="Vue 3, TypeScript, GraphQL, Node.js"
				company="PURE Property Management"
				location="Remote"
				industry="Property Tech"
				position="SSE/Tech Lead"
				date-end="Apr 2022"
				:tasks="PureTasks"
			/>
		</section>
	</article>
</template>
<script setup lang="ts">
import SectionJobDescription from "@/components/SectionJobDescription.vue";

const QADTasks = [
	"Led biweekly web forum discussions on technical decisions, roadblocks, and features",
	"Maintained NestJS BFF endpoints, e2e tests, data mappers, and OpenAPI spec",
	"Introduced components for common page layouts, inputs, and data tables",
	"Architected provide/inject concept for local state in lieu of Pinia",
	"Increased velocity for getting MVP production ready",
];
const IntrinsiQTasks = ["Tailored core components from scratch and by wrapping Kendo UI components", "Implemented micro front-end architecture for shared modules", "Migrated core components to NPM package for reusability", "Completed patient search tool MVP in 3 months"];
const PureTasks = ["Acted as primary lead on financial reporting team and co-led another team", "Documented engineering guidelines for more efficient on-boarding process", "Designed core components NPM package for offshore team", "Mentored junior developers"];
</script>
