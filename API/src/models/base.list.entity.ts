import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { FilterType } from "src/enums.entity";

export class ResponseListEntity<T = unknown> {
	@ApiProperty({
		type: () => Array,
	})
	data: T[];
	total?: number;
}

export class ApiPaginatedRequest {
	start: number;
	limit: number;
	page: number;
	filters?: FilterType[];
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
