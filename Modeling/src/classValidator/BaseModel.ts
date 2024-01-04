import "reflect-metadata";
import { validate } from "class-validator";
import { ModelField } from "@/types";

export class BaseModel {
	static create<T extends BaseModel>(this: new () => T, data = {} as Partial<ModelField<T>>) {
		const record = new this();
		record.setData(data);
		return record;
	}

	async isValid() {
		const response = await validate(this);
		return response.length === 0;
	}

	getData() {
		const data: Record<string, any> = {};
		for (const key in this) {
			data[key] = this[key];
		}
		return data;
	}

	setData(data: Partial<ModelField<this>>) {
		for (const key in data) {
			Reflect.set(this, key, data[key]);
		}
	}
}
