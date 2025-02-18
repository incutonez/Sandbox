<script setup lang="ts">
interface IBaseTabs {
	tabs: string[];
	contentCls?: string;
}

defineProps<IBaseTabs>();
const selected = defineModel<string>("selected");

function onClickTab(tab: string) {
	selected.value = tab;
}

function getTabCls(tab: string) {
	return {
		"bg-sky-200 font-semibold": tab === selected.value,
		"bg-gray-300": tab !== selected.value,
	};
}
</script>

<template>
	<article class="flex flex-col overflow-hidden">
		<section class="flex h-8">
			<div
				v-for="tab in tabs"
				:key="tab"
				class="flex h-full cursor-pointer items-center rounded-t border border-b-0 border-gray-b px-3 text-sm hover:bg-sky-200 [&:nth-child(n+2)]:border-l-0"
				:class="getTabCls(tab)"
				@click="onClickTab(tab)"
			>
				<span>{{ tab }}</span>
			</div>
		</section>
		<section
			class="flex-1 overflow-auto rounded-r rounded-bl border border-gray-b p-2"
			:class="contentCls"
		>
			<slot name="content" />
		</section>
	</article>
</template>
