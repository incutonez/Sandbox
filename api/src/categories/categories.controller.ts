import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoriesService } from "src/categories/categories.service";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
	constructor(private readonly service: CategoriesService) {
	}
}
