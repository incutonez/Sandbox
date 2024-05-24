import { AddressSchema } from "@/views/modeling/typebox/AddressSchema";
import { BaseModel, SymSchema } from "@/views/modeling/typebox/BaseModel";

export class AddressModel extends BaseModel {
	city = "";
	lineOne = "";
	lineTwo = "";
	state = "";
	zipCode = "";

	[SymSchema] = AddressSchema;
}
