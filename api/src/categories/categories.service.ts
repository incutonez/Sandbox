import { Injectable } from "@nestjs/common";
import { CategoriesMapper } from "src/categories/categories.mapper";
import { CategoryModel } from "src/db/models/CategoryModel";

@Injectable()
export class CategoriesService {
	constructor(private mapper: CategoriesMapper) {
	}

	async getCategories() {
		const categories = await CategoryModel.findAll();
		return categories.map((category) => this.mapper.modelToViewModel(category));
	}
}
