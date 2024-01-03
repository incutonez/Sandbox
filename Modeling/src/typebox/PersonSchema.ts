import { Type } from "@sinclair/typebox";
import { AddressSchema } from "@/typebox/AddressSchema.ts";

export const PersonSchema = Type.Object({
	firstName: Type.String({
		minLength: 1,
	}),
	lastName: Type.String({
		minLength: 1,
	}),
	address: AddressSchema,
});
