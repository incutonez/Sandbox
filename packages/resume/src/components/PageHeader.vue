<script setup lang="ts">
import IconEmail from "@/assets/IconEmail.vue";
import IconGitHub from "@/assets/IconGitHub.vue";
import IconLinkedIn from "@/assets/IconLinkedIn.vue";
import IconPhone from "@/assets/IconPhone.vue";
import IconPin from "@/assets/IconPin.vue";
import {
	viewCoverLetter,
	viewResumeEducation,
	viewResumeExperience,
	viewResumeSkills,
	viewResumeSummary,
} from "@/router";

const showCoverLetter = defineModel<boolean>();

function onClickResumeSummary() {
	viewResumeSummary();
	showCoverLetter.value = false;
}

function onClickResumeSkills() {
	viewResumeSkills();
	showCoverLetter.value = false;
}

function onClickResumeExperience() {
	viewResumeExperience();
	showCoverLetter.value = false;
}

function onClickResumeEducation() {
	viewResumeEducation();
	showCoverLetter.value = false;
}

function onClickCoverLetter() {
	viewCoverLetter();
	showCoverLetter.value = true;
}
</script>

<template>
	<article class="flex justify-between bg-blue-resume p-4 text-white sticky top-0 z-1">
		<nav class="print:hidden bg-blue-resume absolute p-4 end-full top-full">
			<ul class="w-max">
				<li>
					<a
						class="anchor-link"
						@click="onClickResumeSummary"
					>Summary</a>
				</li>
				<li>
					<a
						class="anchor-link"
						@click="onClickResumeSkills"
					>Skills</a>
				</li>
				<li>
					<a
						class="anchor-link"
						@click="onClickResumeExperience"
					>Experience</a>
				</li>
				<li>
					<a
						class="anchor-link"
						@click="onClickResumeEducation"
					>Education</a>
				</li>
				<li>
					<a
						class="anchor-link"
						@click="onClickCoverLetter"
					>Cover Letter</a>
				</li>
			</ul>
		</nav>
		<section class="flex flex-col">
			<h1 class="text-3xl font-semibold">
				Jef Harkay
			</h1>
			<h2 class="text-xl">
				Senior Software Engineer
			</h2>
		</section>
		<ul>
			<li class="flex items-center space-x-2">
				<IconEmail class="size-5" />
				<a
					href="mailto:jefharkay@gmail.com"
					class="anchor-link"
					target="_blank"
				>jefharkay@gmail.com</a>
			</li>
			<li class="flex items-center space-x-2">
				<IconPhone class="size-5" />
				<span>
					720-252-1193
				</span>
			</li>
			<li class="flex items-center space-x-2">
				<IconPin class="size-5" />
				<span>
					Fairfax, VA
				</span>
			</li>
		</ul>
		<ul>
			<li class="flex items-center space-x-2">
				<IconLinkedIn class="size-5" />
				<a
					href="https://www.linkedin.com/in/jefharkay"
					class="anchor-link"
					target="_blank"
				>linkedin.com/in/jefharkay</a>
			</li>
			<li class="flex items-center space-x-2">
				<IconGitHub class="size-5" />
				<a
					href="https://github.com/incutonez"
					class="anchor-link"
					target="_blank"
				>github.com/incutonez</a>
			</li>
		</ul>
	</article>
</template>
