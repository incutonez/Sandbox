<template>
	<article>
		<BaseButton
			v-bind="buttonConfig"
			@click="clickToggleMenu"
		>
			<template #icon>
				<IconMenu class="!text-1" />
			</template>
		</BaseButton>
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
import BaseButton, { IButton } from "@/components/BaseButton.vue";
import BaseMenu, { IBaseMenu } from "@/components/BaseMenu.vue";

export interface IGridCellMenu {
	buttonConfig?: IButton;
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
