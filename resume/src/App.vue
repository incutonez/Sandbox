<script setup lang="ts">
import SectionContactInfo from "@/components/SectionContactInfo.vue";
import SectionEducation from "@/components/SectionEducation.vue";
import SectionExperiencePast from "@/components/SectionExperiencePast.vue";
import SectionExperienceRelevant from "@/components/SectionExperienceRelevant.vue";
import SectionSkills from "@/components/SectionSkills.vue";
import SectionSummary from "@/components/SectionSummary.vue";
</script>

<template>
	<main class="flex size-full overflow-auto bg-blue-resume">
		<section class="w-1/3 pl-2 pt-1 text-white">
			<SectionContactInfo class="mb-8" />
			<SectionSkills class="mb-8" />
			<SectionEducation />
		</section>
		<section class="flex w-2/3 flex-col pt-1">
			<article class="mb-8 flex min-h-30 flex-col place-content-center items-center text-white">
				<h1 class="text-5xl">
					Jef Harkay
				</h1>
				<h2>Senior Web Engineer</h2>
			</article>
			<article class="flex-1 space-y-4 bg-white px-2">
				<SectionSummary />
				<SectionExperienceRelevant />
				<SectionExperiencePast />
			</article>
		</section>
	</main>
</template>
