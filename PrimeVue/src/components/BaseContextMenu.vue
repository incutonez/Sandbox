<template>
	<PrimeContextMenu
		ref="rootCmp"
		:model="menuItems"
	/>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PrimeContextMenu from "primevue/contextmenu";
import { getMenuItemProps } from "@/components/menu.helper";
import type { IMenuItem } from "@/types/components";

interface IProps {
	items: IMenuItem[]
}

const props = defineProps<IProps>();
const rootCmp = ref<InstanceType<typeof PrimeContextMenu>>();
const menuItems = computed(() => props.items.map((item) => getMenuItemProps(item)));

function show(event: MouseEvent) {
	rootCmp.value?.show(event);
}

function hide() {
	rootCmp.value?.hide();
}

defineExpose({
	show,
	hide,
});
</script>
