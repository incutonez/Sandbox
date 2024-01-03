import { IPerson } from "@/generated";
import { AddressModel } from "@/typebox/AddressModel.ts";
import { BaseModel, SymSchema } from "@/typebox/BaseModel.ts";
import { PersonSchema } from "@/typebox/PersonSchema.ts";

export class PersonModel extends BaseModel implements IPerson {
	firstName: string;
	lastName: string;
	address = AddressModel.create();

	[SymSchema] = PersonSchema;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
