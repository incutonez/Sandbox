import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiffService } from "src/diff/diff.service";
import { ApiPaginatedResponse, ResponseListEntity } from "src/models/base.list.entity";
import { DiffEntity } from "src/models/diff.entity";

@ApiTags("Differ")
@Controller("diff")
export class DiffController {
	constructor(private readonly service: DiffService) {}

	@Get()
	@ApiPaginatedResponse(DiffEntity)
	getDiff(): ResponseListEntity {
		const data = this.service.getDiff();

		return {
			data,
		};
	}
}
