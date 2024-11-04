import { Module } from "@nestjs/common";
import { ReviewsController } from "src/reviews/reviews.controller";
import { ReviewsMapper } from "src/reviews/reviews.mapper";
import { ReviewsService } from "src/reviews/reviews.service";
import { UsersMapper } from "src/users/users.mapper";

@Module({
	controllers: [ReviewsController],
	providers: [ReviewsService, ReviewsMapper, UsersMapper],
})
export class ReviewsModule {
}
