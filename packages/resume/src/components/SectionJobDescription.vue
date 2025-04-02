<script setup lang="ts">
interface ISectionJobDescription {
	position: string;
	company: string;
	location: string;
	dateStart: string;
	dateEnd: string;
	project: string;
	multipleProjects?: boolean;
	industry: string;
	tasks?: string[];
}

defineProps<ISectionJobDescription>();
</script>

<template>
	<article>
		<section class="flex flex-wrap leading-4 md:flex-row mb-0.5">
			<span class="font-semibold">{{ position }}</span>
			<span class="mx-1">|</span>
			<span class="font-semibold">{{ company }}</span>
			<span class="mx-1">|</span>
			<span>{{ location }}</span>
			<span class="w-full font-semibold text-gray-700 md:ml-auto md:w-auto">{{ dateStart }} - {{ dateEnd }}</span>
		</section>
		<section class="mb-0.5 flex flex-col md:flex-row">
			<span>
				<span class="font-semibold text-blue-resume">Project{{ multipleProjects ? 's' : '' }}</span>
				<span>: {{ project }}</span>
			</span>
			<span class="italic text-gray-700 md:ml-auto">{{ industry }}</span>
		</section>
		<template v-if="!!tasks">
			<ul
				v-for="task in tasks"
				:key="task"
				class="ml-4 list-disc"
			>
				<li>{{ task }}</li>
			</ul>
		</template>
	</article>
</template>
