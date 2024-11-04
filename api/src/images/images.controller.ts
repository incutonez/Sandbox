import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ImagesService } from "src/images/images.service";

@ApiTags("images")
@Controller("images")
export class ImagesController {
	constructor(private readonly service: ImagesService) {
	}
}
