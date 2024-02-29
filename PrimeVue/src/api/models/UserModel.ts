import { UserEntity } from "@incutonez/api-spec/dist";
import { Allow, IsInt, IsString } from "class-validator";
import { IsRequired } from "@/api/models/decorators.ts";
import { ViewModel } from "@/api/models/ViewModel.ts";

export class UserModel extends ViewModel implements UserEntity {
	@Allow()
	id = "";

	@IsRequired()
	@IsString()
	firstName = "";

	@IsRequired()
	@IsString()
	lastName = "";

	@IsRequired()
	@IsString()
	email = "";

	@IsString()
	phone?: string;

	@IsInt()
	birthDate?: number;

	@IsString()
	gender?: string;
}
