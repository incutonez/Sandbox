<script setup lang="ts">
import { computed, onMounted, ref, TransitionProps, watch } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import { CoverLetterRoute, duration } from "@/router";

const route = useRoute();
const showCoverLetter = ref(false);
const resumeTransitionProps = ref<TransitionProps>();
const coverLetterTransitionProps = ref<TransitionProps>();
const mainCls = computed(() => showCoverLetter.value ? "min-h-(--letter-h)" : "min-h-(--letter-h-2)");

function onBeforeEnter() {
	// We want to hide the horizontal scroll that appears when transitioning between areas because it causes a jarring experience
	document.body.style.overflowX = "hidden";
}

function onAfterEnter() {
	document.body.style.overflowX = "auto";
}

watch(route, ({ name }) => showCoverLetter.value = name === CoverLetterRoute);
watch(showCoverLetter, ($showCoverLetter) => document.title = $showCoverLetter ? "Jef Harkay Cover Letter" : "Jef Harkay Resume");

onMounted(() => {
	setTimeout(() => {
		// We don't want the transition to happen on initial page render, which is why we set it in a timeout of onMounted
		resumeTransitionProps.value = {
			onBeforeEnter,
			onAfterEnter,
			enterActiveClass: `transition duration-${duration}`,
			leaveActiveClass: `transition duration-${duration} absolute`,
			enterFromClass: "-translate-x-full opacity-0",
			leaveToClass: "-translate-x-full opacity-0",
			enterToClass: "translate-x-0",
			leaveFromClass: "translate-x-0",
		};
		coverLetterTransitionProps.value = {
			onBeforeEnter,
			onAfterEnter,
			enterActiveClass: `transition duration-${duration}`,
			leaveActiveClass: `transition duration-${duration} absolute`,
			enterFromClass: "translate-x-full opacity-0",
			leaveToClass: "translate-x-full opacity-0",
			enterToClass: "translate-x-0",
			leaveFromClass: "translate-x-0",
		};
	});
});
</script>

<template>
	<main
		class="mx-auto flex bg-white md:w-(--letter-w) relative"
		:class="mainCls"
	>
		<article class="flex flex-1 flex-col relative">
			<PageHeader v-model="showCoverLetter" />
			<article class="bg-white space-y-2 px-4 py-2 flex flex-1">
				<RouterView
					v-slot="slotProps"
					name="JefHarkayResume"
				>
					<Transition v-bind="resumeTransitionProps">
						<KeepAlive>
							<Component
								:is="slotProps.Component"
								v-show="!showCoverLetter"
							/>
						</KeepAlive>
					</Transition>
				</RouterView>
				<RouterView
					v-slot="slotProps"
					name="JefHarkayCoverLetter"
				>
					<Transition v-bind="coverLetterTransitionProps">
						<KeepAlive>
							<Component
								:is="slotProps.Component"
								v-show="showCoverLetter"
								class="h-full"
							/>
						</KeepAlive>
					</Transition>
				</RouterView>
			</article>
		</article>
	</main>
</template>
