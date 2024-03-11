import "reflect-metadata";
import { ResponseListEntity } from "@incutonez/api-spec/dist";
import { ClassTransformOptions, instanceToPlain, plainToInstance } from "class-transformer";
import { validate, ValidatorOptions } from "class-validator";
import { unset } from "lodash-es";
import { isListResponse } from "@/utils/api";
import { getObjectValue, isEmpty } from "@/utils/common";

// Taken from https://github.com/microsoft/TypeScript/issues/42896#issuecomment-782754005
export type DeepPartial<T> = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type ModelInterface<T> = {
	// We need to map over the keys directly to preserve optionality. We filter with "as"
	// Exclude undefined from the check to properly handle optional properties
	// eslint-disable-next-line @typescript-eslint/ban-types
	[K in keyof T as T[K] extends Function ? never : K]: Exclude<T[K], undefined> extends Array<infer E> ? Array<ModelInterface<E>> : Exclude<T[K], undefined> extends Record<string, never> ? ModelInterface<T[K]> : T[K];
};

export interface IModelGetOptions extends ClassTransformOptions {
	exclude?: string[];
}

export interface IModelOptions {
	[IsNew]?: boolean;
	[Parent]?: any;
}

export const IsNew = Symbol("isNew");

export const IsModel = Symbol("isModel");

export const Parent = Symbol("parent");

const LastKeyRegex = /\.(?=[^.]+$)/;

export class ViewModel {
	static [IsModel] = true;
	[IsNew] = true;
	[IsModel] = true;
	[Parent]?: any;

	static create<T extends ViewModel>(this: new () => T, data = {} as DeepPartial<T>, options: IModelOptions = {}) {
		const record = new this();
		record.set(data);
		record[IsNew] = options[IsNew] ?? true;
		record[Parent] = options[Parent];
		return record;
	}

	static async list(params?: unknown) {
		const response = await this.readAll(params);
		let records: unknown[] = [];
		const genericResponse = isListResponse(response);
		const data = genericResponse ? response.data : response;
		if (data) {
			records = data.map((item: any) => this.create(item));
		}
		if (genericResponse) {
			(response.data as unknown[]) = records;
			return response;
		}
		return records;
	}

	async isValid(options?: ValidatorOptions) {
		options ??= {};
		if (!("stopAtFirstError" in options)) {
			options.stopAtFirstError = true;
		}
		const response = await validate(this);
		return response.length === 0;
	}

	get<T = any>(options: IModelGetOptions = {}): T {
		const data = instanceToPlain(this, options) as T;
		const { exclude = [] } = options;
		exclude.forEach((field) => {
			if (field.includes(".")) {
				const [parentKey, key] = field.split(LastKeyRegex);
				const value = getObjectValue(data, parentKey);
				if (Array.isArray(value)) {
					for (let i = value.length - 1; i >= 0; i--) {
						const item = value[i];
						delete item[key];
						// If our object is now empty because that was the last property, let's just remove it from the array
						if (isEmpty(item)) {
							value.splice(i, 1);
						}
					}
				}
				// TODO: What about Set/Map?
				else if (value instanceof Object) {
					delete value[key];
				}
				// If our object is now empty because that was the last property, let's just remove it from the array
				if (isEmpty(value)) {
					// TODO: Figure out how to do this without lodash
					unset(data, parentKey);
				}
			}
			else {
				delete data[field as keyof typeof data];
			}
		});
		return data;
	}

	set(data: DeepPartial<this>) {
		const values = plainToInstance(this.constructor as new () => this, data);
		for (const key in values) {
			const value = values[key];
			if ((value as ViewModel)?.[IsModel]) {
				(value as ViewModel)[Parent] = this;
			}
			else if (Array.isArray(value)) {
				value.forEach((item) => {
					if ((item as ViewModel)?.[IsModel]) {
						(item as ViewModel)[Parent] = this;
					}
				});
			}
			Reflect.set(this, key, values[key]);
		}
	}

	clone(options: IModelGetOptions = {}) {
		return (this.constructor as typeof ViewModel).create(this.get(options)) as typeof this;
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
	static async readAll(_params?: unknown): Promise<ResponseListEntity | unknown[]> {
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
