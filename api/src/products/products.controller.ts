import { faker } from "@faker-js/faker";
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { readdirSync, readFileSync } from "fs";
import { CategoryModel } from "src/db/models/CategoryModel";
import { ImageModel } from "src/db/models/ImageModel";
import { ProductModel } from "src/db/models/ProductModel";
import { ReviewModel } from "src/db/models/ReviewModel";
import { User } from "src/db/models/User";
import { ApiPaginatedRequest } from "src/models/base.list.entity";
import { ProductsService } from "src/products/products.service";

function createParagraphs(total: number) {
	const paragraphs = [];
	for (let i = 0; i < total; i++) {
		paragraphs.push(faker.word.words({
			count: {
				min: 10,
				max: 200,
			},
		}));
	}
	return paragraphs.join("\n\n");
}

@ApiTags("products")
@Controller("products")
export class ProductsController {
	constructor(private readonly service: ProductsService) {
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listProducts(@Body() body: ApiPaginatedRequest) {
		return this.service.getProducts(body);
	}

	@Get(":productId")
	async getProduct(@Param("productId") productId: string) {
		return this.service.getProduct(productId);
	}

	/**
	 * I didn't want to remove my original bulk import because I wanted to have the code around for posterity.
	 * Initially what happened was that I downloaded a bunch of images from https://www.pexels.com/, which I then
	 * classified into directories named after categories for my "products."  I then called this method to import
	 * all the images, used the directory names to find the categories in the DB, and inserted the images, products,
	 * and generated fake reviews.
	 */
	@Post("3a9498d6-22ba-4ffa-ba00-3d68180d2618")
	async bulkImport() {
		const CategoryRe = /.*\\(\w+)$/;
		const FileExtension = /\.\w+$/;
		const allUsers = await User.findAll({
			raw: true,
		});
		const files = readdirSync(`${process.cwd()}/pexels`, {
			recursive: true,
			withFileTypes: true,
		}).filter((item) => item.isFile());
		await Promise.all(files.map(async ({ parentPath, name }) => {
			const buff = readFileSync(`${parentPath}/${name}`);
			const category = CategoryRe.exec(parentPath)[1];
			const found = await CategoryModel.findOne({
				raw: true,
				where: {
					name: category,
				},
			});
			const createdImage = await ImageModel.create({
				contents: buff,
			});
			const createdProduct = await ProductModel.create({
				name: name.replace(FileExtension, ""),
				category_id: found.id,
				image_id: createdImage.id,
				price: faker.number.float({
					min: 0,
					max: 10000,
					fractionDigits: 2,
				}),
				description: faker.word.words({
					count: {
						min: 5,
						max: 100,
					},
				}),
			});
			for (let i = 0; i < faker.number.int({
				max: 10,
			}); i++) {
				await ReviewModel.create({
					title: faker.word.words({
						count: {
							min: 1,
							max: 10,
						},
					}),
					description: createParagraphs(faker.number.int({
						min: 1,
						max: 10,
					})),
					rating: faker.number.int({
						min: 1,
						max: 5,
					}),
					created_date: faker.date.anytime().getTime(),
					created_by: allUsers[faker.number.int({
						min: 0,
						max: allUsers.length - 1,
					})].id,
					product_id: createdProduct.id,
				});
			}
		}));
	}
}
