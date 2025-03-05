import { TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { ModelInterface } from "@/models/ViewModel";

export const SymSchema = Symbol("schema");

export class BaseModel {
	[SymSchema]!: TSchema;

	static create<T extends BaseModel>(this: new () => T, data = {} as Partial<ModelInterface<T>>) {
		const record = new this();
		record.setData(data);
		return record;
	}

	isValid() {
		return Value.Check(this[SymSchema], this.getData());
	}

	getData() {
		const data: Record<string, any> = {};
		for (const key in this) {
			data[key] = this[key];
		}
		return data;
	}

	setData(data: Partial<ModelInterface<this>>) {
		for (const key in data) {
			Reflect.set(this, key, data[key]);
		}
	}
}
