import { decodeToken, isExpired } from "react-jwt";
import { queryOptions } from "@tanstack/react-query";
import { AuthAPI, CartAPI, configuration } from "@/apiConfig.ts";

export const optionsUserLoad = queryOptions({
	queryKey: ["User"],
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

export const optionsCartLoad = queryOptions({
	queryKey: ["Cart"],
	queryFn: async () => {
		const { data } = await CartAPI.getCart();
		return data;
	},
});
