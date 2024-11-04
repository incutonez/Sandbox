import { Injectable } from "@nestjs/common";
import { ReviewModel } from "src/db/models/ReviewModel";
import { ReviewEntity } from "src/models/review.entity";
import { UsersMapper } from "src/users/users.mapper";

export function calculateRating(reviews: ReviewModel[]) {
	let total = 0;
	let count = 0;
	reviews.forEach((review) => {
		count++;
		total += review.rating;
	});
	return (total / (count * 5)) * 5;
}

@Injectable()
export class ReviewsMapper {
	constructor(private readonly usersMapper: UsersMapper) {
	}

	modelToViewModel({ id, title, description, rating, created_date, created_by_user }: ReviewModel): ReviewEntity {
		return {
			id,
			title,
			description,
			rating,
			createdDate: created_date,
			createdBy: this.usersMapper.userToViewModel(created_by_user),
		};
	}
}
