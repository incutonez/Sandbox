import { Type } from "@sinclair/typebox";
import { AddressSchema } from "@/views/modeling/typebox/AddressSchema";

export const PersonSchema = Type.Object({
	firstName: Type.String({
		minLength: 1,
	}),
	lastName: Type.String({
		minLength: 1,
	}),
	address: AddressSchema,
});
