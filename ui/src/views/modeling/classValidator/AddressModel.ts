import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { ViewModel } from "@/models/ViewModel";

export class AddressModel extends ViewModel {
	@MinLength(1)
	@IsString()
	lineOne = "";

	@IsOptional()
	@IsString()
	lineTwo?: string;

	@IsNotEmpty()
	@IsString()
	city = "";

	@IsNotEmpty()
	@IsString()
	state = "";

	@IsNotEmpty()
	@IsString()
	zipCode = "";
}
