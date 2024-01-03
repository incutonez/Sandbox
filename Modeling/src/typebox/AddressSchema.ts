import { Type } from "@sinclair/typebox";

export const AddressSchema = Type.Object({
	lineOne: Type.String({
		minLength: 1,
	}),
	lineTwo: Type.Optional(Type.String()),
	city: Type.String(),
	state: Type.String(),
	zipCode: Type.String(),
});
