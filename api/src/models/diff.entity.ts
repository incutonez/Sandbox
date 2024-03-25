import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ClassInterface } from "src/types";

export const EnumChangeStatus = {
	Unchanged: 0,
	Created: 1,
	Updated: 2,
	Deleted: 3,
} as const;

export type ChangeStatus = typeof EnumChangeStatus[keyof typeof EnumChangeStatus];
export type TDiffValue = DiffEntity | DiffEntity[] | boolean | number | string | Date | object;
export type TDiffEntity = ClassInterface<DiffEntity>;

export class DiffEntity {
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
			$ref: getSchemaPath(DiffEntity),
		}, {
			type: "array",
			items: {
				$ref: getSchemaPath(DiffEntity),
			},
		}],
	})
	value: TDiffValue;
	previous?: DiffEntity;
	@ApiProperty({
		enum: Object.keys(EnumChangeStatus),
		enumName: "EnumChangeStatus",
	})
	status?: ChangeStatus;
}
