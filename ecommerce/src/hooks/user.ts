import { decodeToken, isExpired } from "react-jwt";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI, configuration } from "@/apiConfig.ts";

export const UserQueryKey = "user";

export function useUser() {
	return useQuery({
		queryKey: [UserQueryKey],
		queryFn: async () => {
			const { data } = await AuthAPI.getAccessToken();
			const token = decodeToken(data.accessToken);
			const expired = isExpired(data.accessToken);
			// Set this on the global configuration so all API calls get access to it
			configuration.baseOptions.headers.Authorization = `Bearer: ${data.accessToken}`;
			return {
				token,
				expired,
			};
		},
	});
}
