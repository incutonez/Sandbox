import { IUserDetail, IUserDetailAddress } from "@incutonez/api-spec/dist";
import { Address } from "src/db/models/Address";
import { User } from "src/db/models/User";

export class UsersMapper {
	userToViewModel(user: User): IUserDetail {
		return {
			id: user.id,
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			phone: user.phone,
			birthDate: user.birth_date,
			gender: user.gender,
			address: this.addressToViewModel(user.address),
		};
	}

	addressToViewModel({ line_one, line_two, city, state, zip_code, id }: Address): IUserDetailAddress {
		return {
			id,
			lineOne: line_one,
			lineTwo: line_two,
			city,
			state,
			zipCode: zip_code,
		};
	}
}
