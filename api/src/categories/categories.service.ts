import { Injectable } from "@nestjs/common";
import { CategoriesMapper } from "src/categories/categories.mapper";

@Injectable()
export class CategoriesService {
	constructor(private mapper: CategoriesMapper) {
	}
}
