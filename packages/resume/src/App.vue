<script setup lang="ts">
import { computed, ref, watch } from "vue";
import JefHarkayCoverLetter from "@/components/JefHarkayCoverLetter.vue";
import JefHarkayResume from "@/components/JefHarkayResume.vue";
import PageHeader from "@/components/PageHeader.vue";

const showCoverLetter = ref(false);
const mainCls = computed(() => showCoverLetter.value ? "min-h-(--letter-h)" : "min-h-(--letter-h-2)");

function onBeforeEnter() {
	// We want to hide the horizontal scroll that appears when transitioning between areas because it causes a jarring experience
	document.body.style.overflowX = "hidden";
	window.scroll({
		top: 0,
	});
}

function onAfterEnter() {
	document.body.style.overflowX = "auto";
}

watch(showCoverLetter, ($showCoverLetter) => document.title = $showCoverLetter ? "Jef Harkay Cover Letter" : "Jef Harkay Resume");
</script>

<template>
	<main
		class="mx-auto flex bg-white md:w-(--letter-w) relative"
		:class="mainCls"
	>
		<article class="flex flex-1 flex-col relative">
			<PageHeader v-model="showCoverLetter" />
			<article class="bg-white space-y-2 px-4 py-2 flex flex-1">
				<Transition
					enter-active-class="transition duration-3000"
					leave-active-class="transition duration-3000 absolute"
					enter-from-class="-translate-x-full opacity-0"
					leave-to-class="-translate-x-full opacity-0"
					enter-to-class="translate-x-0"
					leave-from-class="translate-x-0"
					@before-enter="onBeforeEnter"
					@after-enter="onAfterEnter"
				>
					<section
						v-show="!showCoverLetter"
						class="flex flex-col"
					>
						<JefHarkayResume />
						<!-- Because this only shows in print preview, AND we have a print page break in JefHarkayResume, we can't
						  -- use mt-auto, as the position of this element gets altered from the calculated mt-auto that would be
						  -- correct if we didn't have the print page break -->
						<a
							target="_blank"
							class="hidden print:inline underline mt-5 mx-auto w-max"
							title="https://incutonez.github.io/Sandbox/resume/"
							href="https://incutonez.github.io/Sandbox/resume/"
						>Created with ❤️ and Vue</a>
					</section>
				</Transition>
				<Transition
					enter-active-class="transition duration-3000"
					leave-active-class="transition duration-3000 absolute"
					enter-from-class="translate-x-full opacity-0"
					leave-to-class="translate-x-full opacity-0"
					enter-to-class="translate-x-0"
					leave-from-class="translate-x-0"
					@before-enter="onBeforeEnter"
					@after-enter="onAfterEnter"
				>
					<JefHarkayCoverLetter
						v-show="showCoverLetter"
						class="h-full"
					/>
				</Transition>
			</article>
		</article>
	</main>
</template>
