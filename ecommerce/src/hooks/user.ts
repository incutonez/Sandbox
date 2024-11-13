import { decodeToken, isExpired } from "react-jwt";
import { queryOptions } from "@tanstack/react-query";
import { AuthAPI, CartItemsAPI, configuration } from "@/apiConfig.ts";
import { queryClient } from "@/hooks/api.ts";

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
		const { data } = await CartItemsAPI.getCart();
		return data;
	},
});

export function getCartItemTotal(id: string) {
	const data = queryClient.getQueryData(optionsCartLoad.queryKey)?.data ?? [];
	return data.find((item) => item.productId === id)?.count ?? 0;
}
