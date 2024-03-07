<template>
	<article>
		<BaseButton
			v-bind="buttonConfig"
			:icon="IconMenu"
			@click.stop="clickToggleMenu"
		/>
		<BaseMenu
			ref="menuComponent"
			v-bind="menuConfig"
			popup
		/>
	</article>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconMenu from "@/assets/IconMenu.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseMenu, { IBaseMenu } from "@/components/BaseMenu.vue";
import { IBaseButton } from "@/types/components";

export interface IGridCellMenu {
	buttonConfig?: IBaseButton;
	menuConfig: IBaseMenu;
}

withDefaults(defineProps<IGridCellMenu>(), {
	buttonConfig() {
		return {};
	},
});
const menuComponent = ref<InstanceType<typeof BaseMenu>>();

function clickToggleMenu(event: Event) {
	menuComponent.value?.toggle(event);
}
</script>
