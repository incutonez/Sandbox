<script setup lang="ts">
import { computed, ref, watch } from "vue";
import JefHarkayCoverLetter from "@/components/JefHarkayCoverLetter.vue";
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
				<RouterView
					v-slot="slotProps"
					name="JefHarkayResume"
				>
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
