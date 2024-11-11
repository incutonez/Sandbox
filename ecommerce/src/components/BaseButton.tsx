import { ComponentProps, ElementType, ReactNode } from "react";
import classNames from "classnames";
import { BaseIcon } from "@/components/BaseIcon.tsx";

export type IBaseButton<T extends ElementType = "button"> = ComponentProps<T> & {
	text?: string;
	icon?: ElementType;
	iconCls?: string;
	iconAfter?: boolean;
	iconSlot?: ReactNode;
	size?: string;
	hidden?: boolean;
}

export function BaseButton({ text, icon, iconSlot, hidden = false, size = "h-8", iconCls = "", className, iconAfter = false, ...attrs }: IBaseButton) {
	const ButtonIcon = iconSlot || icon &&
			<BaseIcon
				as={icon}
				className={iconCls}
			/>;
	const textNode = text &&
		<span>
			{text}
		</span>;
	const hiddenCls = hidden ? "hidden" : "";
	const disabledCls = attrs.disabled ? "opacity-70 cursor-not-allowed" : "";
	const buttonCls = classNames("flex items-center bg-slate-300 rounded hover:bg-slate-400 space-x-1", hiddenCls, size, disabledCls, textNode ? "px-2" : "px-1", className);
	return (
		<button
			className={buttonCls}
			{...attrs}
		>
			{!iconAfter && ButtonIcon}
			{textNode}
			{iconAfter && ButtonIcon}
		</button>
	);
}
