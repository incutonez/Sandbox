import { useState } from "react";
import { BaseButton } from "@/components/BaseButton.tsx";
import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { ComboBox } from "@/components/ComboBox.tsx";
import { FieldDisplay } from "@/components/FieldDisplay.tsx";
import { FieldNumber } from "@/components/FieldNumber.tsx";
import { IconArrowForward, IconSave } from "@/components/Icons.tsx";
import { RecipeItems } from "@/components/RecipeItems.tsx";
import { IInventoryRecipe, IRecipe, TItemKey } from "@/types.ts";
import { clone, uuid } from "@/utils/common.ts";

export interface IViewRecipe extends IBaseDialog {
	record?: IInventoryRecipe;
	recipes: IRecipe[];
	highlightItem?: TItemKey;
	onSave: (recipe: IInventoryRecipe) => void;
}

export function ViewRecipe({ show, setShow, onSave, record, recipes, highlightItem }: IViewRecipe) {
	let recipeNode;
	const [recipe, setRecipe] = useState<IRecipe | undefined>(record?.recipe);
	const [overclock, setOverclock] = useState<number>(record?.overclockValue ?? 100);
	const [somersloop, setSomersloop] = useState<number>(record?.somersloopValue ?? 0);
	const [machineCount, setMachineCount] = useState<number>(record?.machineCount ?? 1);
	const footerNode = (
		<BaseButton
			text="Save"
			icon={IconSave}
			disabled={!recipe}
			onClick={onClickSave}
		/>
	);
	if (recipe) {
		recipeNode = (
			<section className="flex flex-col space-y-4">
				<section>
					<FieldDisplay
						label="Cycle Time (seconds)"
						value={recipe.productionCycleTime}
					/>
					<FieldDisplay
						label="Cycles / Min"
						value={recipe.cyclesPerMinute}
					/>
					<section className="flex space-x-4">
						<FieldNumber
							label="Overclock Value"
							min={0}
							max={250}
							setter={(value = 100) => setOverclock(value)}
							value={overclock}
						/>
						<FieldNumber
							label="Somersloop Value"
							min={0}
							max={4}
							setter={(value = 0) => setSomersloop(value)}
							value={somersloop}
						/>
						<FieldNumber
							label="Machine Count"
							min={1}
							setter={(value = 1) => setMachineCount(value)}
							value={machineCount}
						/>
					</section>
				</section>
				<section className="flex items-center space-x-16">
					<section className="flex flex-col space-y-2">
						<RecipeItems
							items={recipe.consumes}
							highlightItem={highlightItem}
							machineCount={machineCount}
							overclock={overclock}
							somersloop={somersloop}
						/>
					</section>
					<IconArrowForward />
					<section className="flex flex-col space-y-2">
						<RecipeItems
							items={recipe.produces}
							highlightItem={highlightItem}
							machineCount={machineCount}
							overclock={overclock}
							somersloop={somersloop}
						/>
					</section>
				</section>
			</section>
		);
	}

	function onClickSave() {
		if (recipe) {
			onSave({
				machineCount,
				recipe: clone(recipe),
				id: record?.id || uuid(),
				overclockValue: overclock,
				somersloopValue: somersloop,
			});
			setShow(false);
		}
	}

	function onSelectRecipe(value?: IRecipe) {
		setRecipe(value ? clone(value) : undefined);
	}

	return (
		<BaseDialog
			title="Edit Recipe"
			show={show}
			setShow={setShow}
			footerSlot={footerNode}
		>
			<article className="flex flex-col space-y-4">
				<ComboBox
					label="Recipe"
					value={recipe?.id ?? ""}
					setSelection={onSelectRecipe}
					options={recipes}
					valueField="id"
					displayField="name"
					inputCls="w-68"
				/>
				{recipeNode}
			</article>
		</BaseDialog>
	);
}
