import { AddressModel } from "@/views/modeling/zod/AddressModel";
import { BaseModel, SymSchema } from "@/views/modeling/zod/BaseModel";
import { PersonSchema } from "@/views/modeling/zod/PersonSchema";

export class PersonModel extends BaseModel {
	firstName!: string;
	lastName!: string;
	address = AddressModel.create();

	[SymSchema] = PersonSchema;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
