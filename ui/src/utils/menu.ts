import { Component } from "vue";
import { type MenuItem } from "primevue/menuitem";
import { type IMenuItem } from "@/types/components";

export function getMenuItemProps({ text, icon, visible, click, items, iconCls }: IMenuItem): MenuItem {
	if (icon) {
		icon = (icon as Component).name;
	}
	return {
		icon,
		iconCls,
		visible,
		label: text,
		command: click,
		items: items?.map((item) => getMenuItemProps(item)),
	};
}
