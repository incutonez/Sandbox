import { Controller } from "@nestjs/common";
import { ImagesService } from "src/images/images.service";

@Controller("images")
export class ImagesController {
	constructor(private readonly service: ImagesService) {
	}
}
