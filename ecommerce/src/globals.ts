import { ApiPaginatedRequest, ProductResponseModel } from "@incutonez/spec";
import { useImmer } from "use-immer";
import { ProductsAPI } from "@/apiConfig.ts";

export type TProductStore = ReturnType<typeof useProductStore>;

export function usePaginatedApi<T>() {
	const [records, setRecords] = useImmer<T[]>([]);
	const [params, setParams] = useImmer<ApiPaginatedRequest>({
		start: 0,
		limit: 15,
		page: 1,
		filters: [],
	});

	function previousPage() {
		setParams((draft) => {
			if (draft.page > 0) {
				draft.page--;
			}
		});
	}

	function nextPage() {
		setParams((draft) => {
			draft.page++;
		});
	}

	return {
		records,
		setRecords,
		params,
		setParams,
		previousPage,
		nextPage,
	};
}

// This is a local store that's created in a context/provider in App.tsx
export function useProductStore() {
	const { params, setParams, previousPage, nextPage, records, setRecords } = usePaginatedApi<ProductResponseModel>();

	async function loadRecords() {
		const { data } = await ProductsAPI.listProducts(params);
		setRecords(() => data.data);
		return data.data;
	}

	return {
		records,
		setRecords,
		params,
		setParams,
		loadRecords,
		previousPage,
		nextPage,
	};
}
