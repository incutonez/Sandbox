import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiffService } from "@/diff/diff.service";
import { TreeChangeResponseModel } from "@/models/responses.entity";

@ApiTags("Differ")
@Controller("diff")
export class DiffController {
	constructor(private readonly service: DiffService) {}

	@Get()
	getDiff(): TreeChangeResponseModel {
		const data = this.service.getDiff();

		return {
			data,
		};
	}
}
