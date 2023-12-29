import { BaseModel } from "@/typebox/BaseModel.ts";
import { IPerson } from "@/typebox/IPerson.ts";

export class Person extends BaseModel {
	static schema = IPerson;
}
