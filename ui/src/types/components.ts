// TODOJEF: Add Symbol for disabled options, and then set it up to use that in the optionDisabled fn
import type { Component, HTMLAttributes, ObjectEmitsOptions } from "vue";
// eslint-disable-next-line vue/prefer-import-from-vue
import { UnionToIntersection } from "@vue/shared";
import { TreeNode } from "primevue/treenode";

// Taken from Vue source, as it's not exported by them...
export type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends Array<infer V> ? (event: V, ...args: unknown[]) => void : object extends Options ? (event: string, ...args: unknown[]) => void : UnionToIntersection<{
	[key in Event]: Options[key] extends (...args: infer Args) => unknown ? (event: key, ...args: Args) => void : Options[key] extends unknown[] ? (event: key, ...args: Options[key]) => void : (event: key, ...args: unknown[]) => void;
}[Event]>;

export interface IOption {
	id?: string | number;
	name?: string;
	[key: string]: unknown;
}

export interface ITreeOption<T = string> extends TreeNode {
	children?: ITreeOption<T>[];
	data?: T;
}

export interface IGameEnum extends IOption {
	imageSrc?: string;
	displayName?: string;
}

/**
 * @patch https://github.com/vuejs/core/issues/8286
 * In order to use HTMLAttributes, we MUST specify the @vue-ignore comment, otherwise we get a vite error
 */
export interface IBaseButton extends /** @vue-ignore */ HTMLAttributes {
	text?: string;
	icon?: Component;
	iconCls?: string;
	disabled?: boolean;
	loading?: boolean;
	size?: "small" | "large";
	plain?: boolean;
}

export interface IMenuItem {
	text?: string;
	icon?: string | Component;
	iconCls?: string;
	visible?: boolean;
	click?: () => void;
	items?: IMenuItem[];
}
