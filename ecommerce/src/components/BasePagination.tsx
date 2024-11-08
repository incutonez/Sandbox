import { useContext } from "react";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox, IOption } from "@/components/FieldComboBox.tsx";
import { IconNext, IconPrevious } from "@/components/icons.tsx";
import { ContextProductsStore } from "@/hooks/products.ts";

const options: IOption[] = [{
	id: 10,
	name: "10",
}, {
	id: 20,
	name: "20",
}, {
	id: 50,
	name: "50",
}, {
	id: 100,
	name: "100",
}];

export function BasePagination() {
	const { api } = useContext(ContextProductsStore);

	function onClickPrevious() {
		api.previousPage();
	}

	function onClickNext() {
		api.nextPage();
	}

	function onChangeLimit(found?: IOption) {
		if (found) {
			api.setParams((draft) => {
				draft.limit = found.id;
			});
		}
	}

	return (
		<section className="sticky bottom-0 flex items-center justify-between bg-slate-700 px-4 py-2">
			<FieldComboBox
				options={options}
				onSelectionChange={onChangeLimit}
			/>
			<div className="flex items-center text-amber-500">
				<BaseButton
					icon={IconPrevious}
					disabled={api.previousDisabled}
					onClick={onClickPrevious}
				/>
				<p className="px-2 text-sm font-semibold">
					Page
					{" "}
					{api.params.page}
					{" "}
					of
					{" "}
					{api.lastPage}
				</p>
				<BaseButton
					icon={IconNext}
					iconAfter
					onClick={onClickNext}
				/>
			</div>
			<span className="text-sm font-semibold text-amber-500">
				{api.start}
				{" "}
				-
				{" "}
				{api.end}
				{" "}
				of
				{" "}
				{api.response.total}
			</span>
		</section>
	);
}
