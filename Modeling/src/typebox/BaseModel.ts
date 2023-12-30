import { TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export interface IModel {
	isValid(): Boolean;
	getData: () => Record<string, any>;
}

export function useModel<T extends TSchema>(schema: T) {
	const record = Value.Create(schema) as T & IModel;

	record.isValid = () => {
		return Value.Check(schema, record.getData());
	};

	record.getData = () => {
		const data: Record<string, any> = {};
		for (const key in record) {
			data[key] = record[key];
		}
		return data;
	};

	return record;
}
