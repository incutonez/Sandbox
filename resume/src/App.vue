<script setup lang="ts">
import SectionContactInfo from "@/components/SectionContactInfo.vue";
import SectionEducation from "@/components/SectionEducation.vue";
import SectionExperiencePast from "@/components/SectionExperiencePast.vue";
import SectionExperienceRelevant from "@/components/SectionExperienceRelevant.vue";
import SectionSkills from "@/components/SectionSkills.vue";
import SectionSummary from "@/components/SectionSummary.vue";
</script>

<template>
	<main class="mx-auto flex overflow-auto bg-blue-resume md:h-letter md:w-letter">
		<section class="relative w-48 pl-2 pt-1 text-white md:w-1/3">
			<SectionContactInfo class="mb-8" />
			<SectionSkills class="mb-8" />
			<SectionEducation />
			<section class="absolute bottom-2 flex flex-col items-center justify-center text-sm">
				<span class="font-semibold">Web Version:</span>
				<a
					href="https://incutonez.github.io/Sandbox/resume"
					target="_blank"
					class="w-44 truncate underline md:w-auto md:px-0"
				>https://incutonez.github.io/Sandbox/resume</a>
			</section>
		</section>
		<section class="flex flex-col pt-1 md:w-2/3">
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
