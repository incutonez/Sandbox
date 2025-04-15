import { ComponentProps } from "react";

export interface IFieldLabel extends ComponentProps<"label"> {
	text?: string;
	separator?: string;
}

export function FieldLabel({ text, separator = ":" }: IFieldLabel) {
	if (!text) {
		return;
	}
	return (
		<label className="mr-2 font-semibold text-gray-700 uppercase text-sm">
			{text}
			{separator}
		</label>
	);
}
