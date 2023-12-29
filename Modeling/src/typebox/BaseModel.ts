import { TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export class BaseModel {
	static schema: TSchema;

	static create() {
		return Object.assign(new this(), Value.Create(this.schema));
	}

	isValid() {
		return Value.Check(Object.getPrototypeOf(this).constructor.schema, this.getData());
	}

	getData() {
		const data: Record<any, any> = {};
		for (const key in this) {
			data[key as keyof typeof this] = Reflect.get(this, key);
		}
		return data;
	}
}
