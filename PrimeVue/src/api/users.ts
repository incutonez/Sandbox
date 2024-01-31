import { UsersApi } from "@incutonez/api-spec/generated/api/users-api";
import { configuration } from "@/api/main";

export const UsersAPI = new UsersApi(configuration);

export async function getUsers(start = 0, page = 1) {
	const response = await UsersAPI.getUsers(page, start);
	return response.data;
}
