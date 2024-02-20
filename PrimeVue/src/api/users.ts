import { UsersApi } from "@incutonez/api-spec/generated/api/users-api";
import { configuration } from "@/api/main";
import { IGridLoad } from "@/types/dataTable.ts";

export const UsersAPI = new UsersApi(configuration);

export async function getUsers({ start, max, page }: IGridLoad) {
	const response = await UsersAPI.getUsers(start, max, page);
	return response.data;
}
