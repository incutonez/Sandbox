import { AddressSchema } from "@/views/modeling/zod/AddressSchema";
import { BaseModel, SymSchema } from "@/views/modeling/zod/BaseModel";

export class AddressModel extends BaseModel {
	lineOne!: string;
	lineTwo?: string;
	city!: string;
	state!: string;
	zipCode!: string;

	[SymSchema] = AddressSchema;
}
