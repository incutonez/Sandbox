import { ApiPaginatedRequest } from "@incutonez/api-spec/dist";
import { UsersApi } from "@incutonez/api-spec/generated/api/users-api";
import { configuration } from "@/api/main";

export const UsersAPI = new UsersApi(configuration);

export async function getUsers(request: ApiPaginatedRequest) {
	const response = await UsersAPI.listUsers(request);
	return response.data;
}

export async function getUser(userId: string) {
	const response = await UsersAPI.getUser(userId);
	return response.data;
}
