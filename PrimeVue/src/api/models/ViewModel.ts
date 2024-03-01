import { validate, ValidatorOptions } from "class-validator";

export type ModelField<T> = {
	// We need to map over the keys directly to preserve optionality. We filter with "as"
	// Exclude undefined from the check to properly handle optional properties
	[K in keyof T as T[K] extends Function ? never : K]: Exclude<T[K], undefined> extends Array<infer E> ? Array<ModelField<E>> : Exclude<T[K], undefined> extends Record<string, any> ? ModelField<T[K]> : T[K];
};

export const IsNew = Symbol("isNew");

export class ViewModel {
	[IsNew] = true;

	static create<T extends ViewModel>(this: new () => T, data = {} as Partial<ModelField<T>>) {
		const record = new this();
		record.set(data);
		return record;
	}

	async isValid(options?: ValidatorOptions) {
		options ??= {};
		if (!("stopAtFirstError" in options)) {
			options.stopAtFirstError = true;
		}
		const response = await validate(this);
		return response.length === 0;
	}

	get<T extends Object>() {
		const data = {} as T;
		for (const key in this) {
			Reflect.set(data, key, this[key]);
		}
		return data;
	}

	set(data: Partial<ModelField<this>>) {
		for (const key in data) {
			Reflect.set(this, key, data[key]);
		}
	}

	clear() {
		for (const key in this) {
			Reflect.set(this, key, null);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
	async create(_params?: unknown): Promise<any> {
		throw Error("Method not implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
	async read(_params?: unknown): Promise<any> {
		throw Error("Method not implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
	async update(_params?: unknown): Promise<any> {
		throw Error("Method not implemented");
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
	async delete(_params?: unknown): Promise<any> {
		throw Error("Method not implemented");
	}

	async load(params?: unknown) {
		const data = await this.read(params);
		this[IsNew] = false;
		this.set(data);
	}

	async save(params?: unknown) {
		const data = this[IsNew] ? await this.create(params) : await this.update(params);
		this[IsNew] = false;
		this.set(data);
	}
}
