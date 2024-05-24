import { Type } from "class-transformer";
import { IsNotEmptyObject, IsString, MinLength, ValidateNested } from "class-validator";
import { ViewModel } from "@/models/ViewModel";
import { AddressModel } from "@/views/modeling/classValidator/AddressModel";

export class PersonModel extends ViewModel {
	@MinLength(1)
	@IsString()
	firstName = "";

	@MinLength(1)
	@IsString()
	lastName = "";

	@ValidateNested()
	@IsNotEmptyObject()
	@Type(() => AddressModel)
	address = AddressModel.create();

	get name() {
		return `${this.firstName} ${this.lastName}`;
	}
}
