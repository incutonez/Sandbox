import { Controller } from "@nestjs/common";
import { ReviewsService } from "src/reviews/reviews.service";

@Controller("reviews")
export class ReviewsController {
	constructor(private readonly service: ReviewsService) {
	}
}
