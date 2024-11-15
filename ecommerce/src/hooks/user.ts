import { decodeToken, isExpired } from "react-jwt";
import { CartItemEntity } from "@incutonez/spec";
import { queryOptions } from "@tanstack/react-query";
import { AuthAPI, CartItemsAPI, configuration } from "@/apiConfig.ts";

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

export const optionsCartCheckoutLoad = queryOptions({
	queryKey: ["CartCheckout"],
	async queryFn() {
		const { data } = await CartItemsAPI.getCartCheckout();
		return data;
	},
});

export function getCartItemTotal(data: CartItemEntity[] = [], id: string) {
	return data.find((item) => item.productId === id)?.count ?? 0;
}
