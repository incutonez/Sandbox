import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import isEmpty from "just-is-empty";

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
