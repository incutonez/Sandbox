import { Type } from "@sinclair/typebox";

// TODOJEF: Generate from OpenAPI example
export const IPerson = Type.Object({
	firstName: Type.String({
		minLength: 1,
	}),
	lastName: Type.String({
		minLength: 1,
	}),
	address: Type.Object({
		lineOne: Type.String({
			minLength: 1,
		}),
		lineTwo: Type.String(),
		city: Type.String(),
		state: Type.String(),
		zipCode: Type.String(),
	}),
});
