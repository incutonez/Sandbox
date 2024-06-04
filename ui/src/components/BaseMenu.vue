<template>
	<PrimeMenu
		ref="componentEl"
		:model="menuItems"
	>
		<template #itemicon="slotProps">
			<Component
				:is="slotProps.item.icon"
				v-if="showItemIcon(slotProps.item.icon)"
				class="mr-1 size-4"
				:class="slotProps.item.iconCls"
			/>
		</template>
	</PrimeMenu>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PrimeMenu from "primevue/tieredmenu";
import { type IMenuItem } from "@/types/components";
import { getMenuItemProps } from "@/utils/menu";

export interface IBaseMenu {
	items: IMenuItem[];
}

const props = defineProps<IBaseMenu>();
const componentEl = ref<InstanceType<typeof PrimeMenu>>();
const menuItems = computed(() => props.items.map((item) => getMenuItemProps(item)));

function showItemIcon(item: string | unknown) {
	return typeof item !== "string";
}

function toggle(event: Event) {
	componentEl.value?.toggle(event);
}

defineExpose({
	toggle,
});
</script>
