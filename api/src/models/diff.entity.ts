import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ClassInterface } from "src/types";

export const EnumChangeStatus = {
	Unchanged: 0,
	Created: 1,
	Updated: 2,
	Deleted: 3,
} as const;

export type ChangeStatus = typeof EnumChangeStatus[keyof typeof EnumChangeStatus];
export type TTreeItemValue = TreeItemModel | TreeItemModel[] | boolean | number | string | Date | object;
export type TTreeItem = ClassInterface<TreeItemModel>;

export class TreeChangeModel {
	username: string;
	date: number;
	items: TreeItemModel[];
}

export class TreeItemModel {
	@ApiProperty({
		oneOf: [{
			type: "string",
		}, {
			type: "number",
		}],
	})
	field: number | string;
	@ApiProperty({
		oneOf: [{
			type: "string",
		}, {
			type: "boolean",
		}, {
			type: "number",
		}, {
			$ref: getSchemaPath(TreeItemModel),
		}, {
			type: "array",
			items: {
				$ref: getSchemaPath(TreeItemModel),
			},
		}],
	})
	value: TTreeItemValue;
	previous?: TreeItemModel;
	@ApiProperty({
		enum: Object.keys(EnumChangeStatus),
		enumName: "EnumChangeStatus",
	})
	status?: ChangeStatus;
}
