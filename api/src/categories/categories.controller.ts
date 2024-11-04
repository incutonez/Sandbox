import { Controller } from "@nestjs/common";
import { CategoriesService } from "src/categories/categories.service";

@Controller("categories")
export class CategoriesController {
	constructor(private readonly service: CategoriesService) {
	}
}
