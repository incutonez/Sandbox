import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { BaseModel } from "@/classValidator/BaseModel.ts";
import { IAddress } from "@/generated";

export class AddressModel extends BaseModel implements IAddress {
	@MinLength(1)
	@IsString()
	lineOne: string;

	@IsOptional()
	@IsString()
	lineTwo?: string;

	@IsNotEmpty()
	@IsString()
	city: string;

	@IsNotEmpty()
	@IsString()
	state: string;

	@IsNotEmpty()
	@IsString()
	zipCode: string;
}
