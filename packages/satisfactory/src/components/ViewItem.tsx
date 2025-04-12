import { BaseDialog, IBaseDialog } from "@/components/BaseDialog.tsx";
import { IInventoryItem } from "@/types.ts";

export interface IViewItem extends IBaseDialog {
	record?: IInventoryItem;
}

export function ViewItem({ record, show, setShow }: IViewItem) {
	console.log(record);
	if (!record) {
		return;
	}
	const title = `${record.name} Production`;
	return (
		<BaseDialog
			title={title}
			show={show}
			setShow={setShow}
		>
			<span>
				Hello
				{record.name}
			</span>
		</BaseDialog>
	);
}
