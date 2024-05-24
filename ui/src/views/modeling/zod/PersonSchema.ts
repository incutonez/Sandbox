import { z } from "zod";
import { AddressSchema } from "@/views/modeling/zod/AddressSchema";

export const PersonSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	address: AddressSchema,
});
