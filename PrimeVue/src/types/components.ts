// TODOJEF: Add Symbol for disabled options, and then set it up to use that in the optionDisabled fn
import type { HTMLAttributes } from "vue";

export interface IOption {
	id?: string | number;
	name?: string;
	[key: string]: any;
}

/**
 * @patch https://github.com/vuejs/core/issues/8286
 * In order to use HTMLAttributes, we MUST specify the @vue-ignore comment, otherwise we get a vite error
 */
export interface IBaseButton extends /** @vue-ignore */ HTMLAttributes {
	text?: string;
	icon?: InstanceType<any>;
	iconCls?: string;
	disabled?: boolean;
	loading?: boolean;
	size?: "small" | "large";
	plain?: boolean;
	unstyled?: boolean;
}
