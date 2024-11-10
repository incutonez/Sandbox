import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductsAPI } from "@/apiConfig.ts";
import { ContextPaginatedApi, queryClient } from "@/hooks/api.ts";

export const QueryKeyProducts = "ViewProducts";

export function useLoadProducts() {
	const { page, limit, filters, setTotal, setLoading } = useContext(ContextPaginatedApi)!;
	return useQuery({
		/* staleTime by default is set to always say the data that was just fetched is stale... if we set it to
		 * Infinity, then it's never considered stale UNTIL the gcTime clears it from the cache... so in the scenario
		 * below, after 10 seconds of not using that query, the fetched data is cleared from the cache */
		staleTime: Infinity,
		gcTime: 10000,
		queryKey: [QueryKeyProducts, page, limit, filters],
		queryFn: async () => {
			setLoading(true);
			const { data } = await ProductsAPI.listProducts({
				page,
				limit,
				filters,
				start: 0,
			});
			setTotal(data.total ?? 0);
			setLoading(false);
			return data.data;
		},
	});
}

export function useProductRecords() {
	const { page, limit, filters } = useContext(ContextPaginatedApi)!;
	return queryClient.getQueryData([QueryKeyProducts, page, limit, filters]);
}
