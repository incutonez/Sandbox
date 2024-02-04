<template>
	<PrimeMenu
		ref="componentEl"
		:model="menuItems"
	>
		<template #itemicon="slotProps">
			<Component
				v-if="showItemIcon(slotProps.item.icon)"
				class="mr-1 h-4 w-4"
				:class="slotProps.item.iconCls"
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
import type { MenuItem } from "primevue/menuitem";
import PrimeMenu from "primevue/tieredmenu";

export interface IMenuItem {
	text?: string;
	icon?: string | InstanceType<any>;
	iconCls?: string;
	visible?: boolean;
	click?: () => void;
	items?: IMenuItem[];
}

export interface IBaseMenu {
	items: IMenuItem[];
}

const props = defineProps<IBaseMenu>();
// const slots = defineSlots<MenuSlots>;
const componentEl = ref<InstanceType<typeof PrimeMenu>>();
const menuItems = computed<MenuItem>(() => props.items.map((item) => getMenuItemProps(item)));

function showItemIcon(item: string | InstanceType<any>) {
	return typeof item !== "string";
}

function getMenuItemProps({ text, icon, visible, click, items, iconCls }: IMenuItem): MenuItem {
	return {
		icon,
		iconCls,
		visible,
		label: text,
		command: click,
		items: items?.map((item) => getMenuItemProps(item)),
	};
}

function toggle(event: Event) {
	componentEl.value?.toggle(event);
}

defineExpose({
	toggle,
});
</script>
