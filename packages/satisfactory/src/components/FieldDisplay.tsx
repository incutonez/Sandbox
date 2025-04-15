import { ComponentProps } from "react";
import { FieldLabel } from "@/components/FieldLabel.tsx";

export interface IFieldDisplay extends ComponentProps<"article"> {
	label?: string;
	value?: string | number;
}

export function FieldDisplay({ label, value = "" }: IFieldDisplay) {
	return (
		<article className="h-8 flex space-x-2 items-center">
			<FieldLabel text={label} />
			<span className="text-sm font-semibold">
				{value}
			</span>
		</article>
	);
}
