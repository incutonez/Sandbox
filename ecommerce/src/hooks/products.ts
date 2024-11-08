import { createContext } from "react";
import { ProductResponseModel } from "@incutonez/spec";
import { ProductsAPI } from "@/apiConfig.ts";
import { usePaginatedApi } from "@/hooks/api.ts";

export type TProductsStore = ReturnType<typeof useProductsStore>;

export const ContextProductsStore = createContext({} as TProductsStore);

// This is a local store that's created in a context/provider in App.tsx
export function useProductsStore() {
	const api = usePaginatedApi<ProductResponseModel>();

	async function loadRecords() {
		const { data } = await ProductsAPI.listProducts(api.params);
		api.setResponse(data);
		return data.data;
	}

	return {
		api,
		loadRecords,
	};
}
