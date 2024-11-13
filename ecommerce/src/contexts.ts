import { createContext, useContext } from "react";
import { CartResponseModel, ProductListEntity } from "@incutonez/spec";
import { UseQueryResult } from "@tanstack/react-query";

export const ContextProductRecord = createContext<ProductListEntity | undefined>(undefined);

export const ContextCart = createContext<UseQueryResult<CartResponseModel> | undefined>(undefined);

export function useProductRecord() {
	return useContext(ContextProductRecord) as ProductListEntity;
}

export function useCart() {
	return useContext(ContextCart) as UseQueryResult<CartResponseModel>;
}

export function useCartTotal() {
	const { data } = useCart();
	return data?.total ?? 0;
}
