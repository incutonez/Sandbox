import { IAddress } from "@/generated";
import { AddressSchema } from "@/zod/AddressSchema.ts";
import { BaseModel, SymSchema } from "@/zod/BaseModel";

export class AddressModel extends BaseModel implements IAddress {
	city: string;
	lineOne: string;
	lineTwo: string;
	state: string;
	zipCode: string;

	[SymSchema] = AddressSchema;
}
