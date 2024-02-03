<template>
	<PrimeMenu
		ref="componentEl"
		:model="menuItems"
	>
		<template #itemicon="slotProps">
			<Component
				v-if="showItemIcon(slotProps.item.icon)"
				class="mr-1 h-4 w-4"
				:is="slotProps.item.icon"
			/>
		</template>
		<!-- Expose all slots from parent component -->
		<template
			v-for="(_, slot) of $slots"
			#[slot]="scope"
		>
			<slot
				:name="slot as keyof typeof $slots"
				v-bind="scope ?? {}"
			/>
		</template>
	</PrimeMenu>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PrimeMenu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";

export interface IMenuItem {
	text?: string;
	icon?: string | InstanceType<any>;
	visible?: boolean;
}

export interface IBaseMenu {
	items: IMenuItem[];
}

const props = defineProps<IBaseMenu>();
// const slots = defineSlots<MenuSlots>;
const componentEl = ref<InstanceType<typeof PrimeMenu>>();
const menuItems = computed<MenuItem>(() => {
	return props.items.map(({ text, icon, visible }) => {
		return {
			icon,
			visible,
			label: text,
		};
	});
});

function showItemIcon(item: string | InstanceType<any>) {
	return typeof item !== "string";
}

function toggle(event: Event) {
	componentEl.value?.toggle(event);
}

defineExpose({
	toggle,
});
</script>
