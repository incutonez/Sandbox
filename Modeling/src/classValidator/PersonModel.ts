import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { AddressModel } from "@/classValidator/AddressModel.ts";
import { BaseModel } from "@/classValidator/BaseModel.ts";
import { IPerson } from "@/generated";

export class PersonModel extends BaseModel implements IPerson {
	@IsNotEmpty()
	@IsString()
	firstName: string;

	@IsNotEmpty()
	@IsString()
	lastName: string;

	@ValidateNested()
	@IsNotEmptyObject()
	@Type(() => AddressModel)
	address = AddressModel.create();

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
