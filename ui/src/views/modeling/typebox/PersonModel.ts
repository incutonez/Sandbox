import { AddressModel } from "@/views/modeling/typebox/AddressModel";
import { BaseModel, SymSchema } from "@/views/modeling/typebox/BaseModel";
import { PersonSchema } from "@/views/modeling/typebox/PersonSchema";

export class PersonModel extends BaseModel {
	firstName = "";
	lastName = "";
	address = AddressModel.create();

	[SymSchema] = PersonSchema;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
