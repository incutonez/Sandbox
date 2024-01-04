import { IPerson } from "@/generated";
import { AddressModel } from "@/zod/AddressModel.ts";
import { BaseModel, SymSchema } from "@/zod/BaseModel.ts";
import { PersonSchema } from "@/zod/PersonSchema.ts";

export class PersonModel extends BaseModel implements IPerson {
	firstName: string;
	lastName: string;
	address = AddressModel.create();

	[SymSchema] = PersonSchema;

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
