// @ts-expect-error This isn't exported with a declaration file
import { defaultMetadataStorage } from "class-transformer/esm5/storage";
import { TransformOptions } from "class-transformer/types/interfaces";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import isEmpty from "just-is-empty";
import { ViewModel } from "@/models/ViewModel";

export function IsRequired(validationOptions?: ValidationOptions) {
	return function(object: Object, propertyName: string) {
		registerDecorator({
			name: "IsRequired",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				defaultMessage(args: ValidationArguments) {
					return `${args.property} is required`;
				},
				validate(value: any) {
					return typeof value !== "number" && isEmpty(value);
				},
			},
		});
	};
}

// Idea taken from https://github.com/typestack/class-transformer/issues/563#issue-788919461
export function ModelTransform(cls: () => typeof ViewModel, options?: TransformOptions): PropertyDecorator {
	options ??= {};
	options.toClassOnly = true;
	return function(target: any, propertyName: string | Symbol): void {
		defaultMetadataStorage.addTransformMetadata({
			target: target.constructor,
			propertyName: propertyName as string,
			options,
			transformFn({ value }: { value: any }) {
				let output: ViewModel | ViewModel[] | undefined;
				const model = cls();
				if (value) {
					if (Array.isArray(value)) {
						output = [];
						value.forEach((item) => (output as ViewModel[]).push(model.create(item)));
					}
					else {
						output = model.create(value);
					}
				}
				return output;
			},
		});
	};
}
