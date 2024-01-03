import { IAddress } from "@/generated";
import { AddressSchema } from "@/typebox/AddressSchema.ts";
import { BaseModel, SymSchema } from "@/typebox/BaseModel.ts";

export class AddressModel extends BaseModel implements IAddress {
	city: string;
	lineOne: string;
	lineTwo: string;
	state: string;
	zipCode: string;

	[SymSchema] = AddressSchema;
}
