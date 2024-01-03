import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseModel } from "@/classValidator/BaseModel.ts";
import { IAddress } from "@/generated";

export class AddressModel extends BaseModel implements IAddress {
	@IsNotEmpty()
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
