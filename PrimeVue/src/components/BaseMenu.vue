<template>
	<PrimeMenu
		ref="componentEl"
		:model="menuItems"
	>
		<template #itemicon="slotProps">
			<Component
				:is="slotProps.item.icon"
				v-if="showItemIcon(slotProps.item.icon)"
				class="mr-1 h-4 w-4"
				:class="slotProps.item.iconCls"
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
import PrimeMenu from "primevue/tieredmenu";
import { getMenuItemProps } from "@/components/menu.helper";
import { type IMenuItem } from "@/types/components";

export interface IBaseMenu {
	items: IMenuItem[];
}

const props = defineProps<IBaseMenu>();
// const slots = defineSlots<MenuSlots>;
const componentEl = ref<InstanceType<typeof PrimeMenu>>();
const menuItems = computed(() => props.items.map((item) => getMenuItemProps(item)));

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
