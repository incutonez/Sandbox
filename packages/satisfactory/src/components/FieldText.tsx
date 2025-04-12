import { ChangeEvent, ComponentProps, ReactNode, useRef } from "react";
import { TSetTimeout } from "@/types.ts";
import { emptyFn } from "@/utils/common.ts";

export interface IFieldText extends ComponentProps<"article"> {
	value?: string;
	setter: (value: string) => void;
	placeholder?: string;
	label?: string;
	typeDelay?: number;
	onInputChange?: (value: string) => void;
}

export function FieldText({ value, setter, label, onBlur = emptyFn, typeDelay = 250, onInputChange, placeholder }: IFieldText) {
	let labelEl: ReactNode;
	const typeDelayTimer = useRef<TSetTimeout>(undefined);

	function onChange({ target }: ChangeEvent<HTMLInputElement>) {
		const { value } = target;
		setter(value);
		if (onInputChange) {
			clearTimeout(typeDelayTimer.current);
			typeDelayTimer.current = setTimeout(() => onInputChange(value), typeDelay);
		}
	}

	if (label) {
		labelEl = (
			<label className="mr-2 font-semibold text-gray-700">
				{label}
				:
			</label>
		);
	}
	return (
		<article>
			{labelEl}
			<input
				className="appearance-none rounded-md h-8 py-1 px-2 outline-none text-sm ring-1 ring-inset ring-offset-0 ring-gray-500 enabled:focus:ring-sky-600 bg-white text-gray-800 disabled:bg-gray-200 disabled:opacity-100 placeholder:text-gray-500"
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</article>
	);
}
