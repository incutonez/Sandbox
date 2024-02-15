import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";

export class ResponseListEntity<T = unknown> {
	@ApiProperty({
		type: () => Array,
	})
	data: T[];
	total?: number;
}

export const ApiPaginatedResponse = <TModel extends Type<unknown>>(model: TModel) => {
	return applyDecorators(
		ApiExtraModels(ResponseListEntity, model),
		ApiOkResponse({
			schema: {
				allOf: [
					{
						$ref: getSchemaPath(ResponseListEntity),
					},
					{
						properties: {
							data: {
								type: "array",
								items: {
									$ref: getSchemaPath(model),
								},
							},
						},
					},
				],
			},
		}),
	);
};