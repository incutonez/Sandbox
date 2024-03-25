import { ApiProperty } from "@nestjs/swagger";
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
	field: number | string;
	value: TDiffValue;
	previous?: DiffEntity;
	@ApiProperty({
		enum: Object.keys(EnumChangeStatus),
		enumName: "EnumChangeStatus",
	})
	status?: ChangeStatus;
}
