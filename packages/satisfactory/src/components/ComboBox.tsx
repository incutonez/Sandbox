import { ReactNode } from "react";
import {
	Button as BaseButton,
	ComboBox as BaseComboBox, ComboBoxProps,
	Input as BaseInput, Key,
	Label as BaseLabel,
	ListBox as BaseListBox,
	ListBoxItem as BaseListBoxItem,
	Popover as BasePopover,
} from "react-aria-components";
import classNames from "classnames";
import { IconArrowDown } from "@/components/Icons.tsx";

export type TComboBoxValue = Key | null;

export interface IComboBox<TOption extends object, TKey = keyof TOption> extends Omit<ComboBoxProps<TOption>, "children"> {
	value: TComboBoxValue;
	options: TOption[];
	valueField: TKey;
	displayField: TKey;
	setValue: (value: TComboBoxValue) => void;
	setSelection?: (value?: TOption) => void;
	label?: string;
	children?: ReactNode | ((item: TOption) => ReactNode);
	listHeight?: number;
	inputCls?: string;
}

export function ComboBox<TOption extends object>({ value, inputCls, setValue, setSelection, options, label, children, menuTrigger = "focus", valueField = "value" as keyof TOption, displayField = "display" as keyof TOption, listHeight = 300, ...props }: IComboBox<TOption>) {
	let labelEl: ReactNode;
	inputCls = classNames("appearance-none rounded-md h-8 outline-none ring-1 ring-inset ring-offset-0 ring-gray-500 enabled:focus:ring-sky-600 text-sm pl-2 pr-6 py-1", inputCls);
	if (label) {
		labelEl = (
			<BaseLabel>
				{label}
			</BaseLabel>
		);
	}
	children ??= (item) => {
		return (
			<BaseListBoxItem
				id={item[valueField] as Key}
				className="hover:bg-sky-100 cursor-pointer p-2 text-sm data-[focus-visible]:bg-sky-100 aria-selected:bg-sky-200 aria-selected:font-semibold"
			>
				{item[displayField] as string}
			</BaseListBoxItem>
		);
	};

	function onSelectionChange(key: TComboBoxValue) {
		setValue(key);
		if (setSelection) {
			setSelection(options.find((item) => item[valueField] === key));
		}
	}

	return (
		<BaseComboBox
			{...props}
			items={options}
			menuTrigger={menuTrigger}
			selectedKey={value}
			onSelectionChange={onSelectionChange}
		>
			{labelEl}
			<BaseInput className={inputCls} />
			<BaseButton className="relative cursor-pointer -ml-6 top-1.5">
				<IconArrowDown className="size-6" />
			</BaseButton>
			<BasePopover
				maxHeight={listHeight}
				offset={2}
				className="rounded-md w-(--trigger-width) border overflow-auto bg-white shadow-lg"
			>
				<BaseListBox>
					{children}
				</BaseListBox>
			</BasePopover>
		</BaseComboBox>
	);
}
