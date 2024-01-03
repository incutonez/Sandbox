import { TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export type ModelField<T> = {
	// We need to map over the keys directly to preserve optionality. We filter with "as"
	[K in keyof T as T[K] extends Function ? never : K]: // Exclude undefined from the check to properly handle optional properties
	Exclude<T[K], undefined> extends Array<infer E> ? Array<ModelField<E>> : Exclude<T[K], undefined> extends Record<string, any> ? ModelField<T[K]> : T[K];
};

export const SymSchema = Symbol("schema");

export class BaseModel {
	[SymSchema]: TSchema;

	static create<T extends BaseModel>(this: new () => T, data = {} as Partial<ModelField<T>>) {
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

	setData(data: Partial<ModelField<this>>) {
		for (const key in data) {
			Reflect.set(this, key, data[key]);
		}
	}
}
