import { IUserDetail } from "@incutonez/api-spec/dist";
import { User } from "src/db/models/User";

export class UsersMapper {
	modelToViewModel(user: User): IUserDetail {
		console.log(user);
		return {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			phone: user.phone,
			birthDate: user.birth_date,
			gender: user.gender,
		};
	}
}
