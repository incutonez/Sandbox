import { z } from "zod";

export const AddressSchema = z.object({
	lineOne: z.string().min(1),
	lineTwo: z.string().optional(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
});
