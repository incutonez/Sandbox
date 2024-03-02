<template>
	<article>
		<BaseButton
			v-bind="buttonConfig"
			@click.stop="clickToggleMenu"
		>
			<template #icon>
				<IconMenu class="h-4 w-4" />
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
import BaseButton from "@/components/BaseButton.vue";
import BaseMenu, { IBaseMenu } from "@/components/BaseMenu.vue";
import { IBaseButton } from "@/types/components.ts";

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
