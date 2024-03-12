<template>
	<section
		ref="rootEl"
		class="base-card"
	>
		<div
			ref="titleRoot"
			class="base-card-title-wrapper items-center"
		>
			<slot
				v-if="hasTitle"
				name="title"
			>
				<FieldLabel
					:text="title"
					separator=""
					class="flex-1"
				/>
			</slot>
			<IconCollapse
				v-if="isExpanded"
				class="h-5 w-5 cursor-pointer"
				@click="onToggleExpanded"
			/>
			<IconAdd
				v-else
				class="h-5 w-5 cursor-pointer"
				@click="onToggleExpanded"
			/>
		</div>
		<div
			v-show="isExpanded"
			class="base-card-body"
			:class="bodyCls"
		>
			<slot />
		</div>
	</section>
</template>

<script setup lang="ts">
import {
	computed,
	onMounted,
	ref, useSlots,
	watch,
} from "vue";
import IconAdd from "@/assets/IconAdd.vue";
import IconCollapse from "@/assets/IconCollapse.vue";
import FieldLabel from "@/components/FieldLabel.vue";

interface IProps {
	title?: string;
	collapsible?: boolean;
	expanded?: boolean;
	bodyCls?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	title: "",
	expanded: true,
	bodyCls: undefined,
});
const slots = useSlots();
const rootEl = ref<HTMLElement>();
const titleRoot = ref(null);
const isExpanded = ref(props.expanded);
const hasTitle = computed(() => !!props.title || !!slots.title);
function onToggleExpanded() {
	isExpanded.value = !isExpanded.value;
}
function updateExpanded(value: boolean) {
	if (value) {
		rootEl.value?.classList.add("expanded");
	}
	else {
		rootEl.value?.classList.remove("expanded");
	}
}
onMounted(() => updateExpanded(isExpanded.value));
watch(isExpanded, (value) => updateExpanded(value));
</script>

<style lang="scss" scoped>
.base-card {
  @apply flex flex-col border;
}

.picker-icon {
  @apply cursor-pointer;
}

.expanded > .base-card-title-wrapper > .picker-icon  {
  @apply rotate-180;
}

.bp-2 > .base-card-body {
  @apply p-2;
}

.base-card-body {
  @apply flex border-t border-gray-300;
}

.horizontal > .base-card-body {
  @apply space-x-2;
}

.vertical > .base-card-body {
  @apply flex-col space-y-2;
}

.base-card-title-wrapper {
  @apply flex bg-gray-100 p-2;
}
</style>
