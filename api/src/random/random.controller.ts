import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RandomService } from "src/random/random.service";

@ApiTags("Random")
@Controller("random")
export class RandomController {
	constructor(private readonly service: RandomService) {}

	@Get()
	getRandomData(@Query("page") page: number) {
		return this.service.getRandomData(page);
	}
}
