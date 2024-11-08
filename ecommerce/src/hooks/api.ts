import { useMemo } from "react";
import { ApiPaginatedRequest } from "@incutonez/spec";
import { useImmer } from "use-immer";

export function usePaginatedApi<T extends { total?: number }>() {
	const [response, setResponse] = useImmer({} as T);
	const [params, setParams] = useImmer<ApiPaginatedRequest>({
		start: 0,
		limit: 15,
		page: 1,
		filters: [],
	});
	const start = useMemo(() => (params.page - 1) * params.limit + 1, [params.page, params.limit]);
	const end = useMemo(() => start + params.limit - 1, [start, params.limit]);
	const previousDisabled = useMemo(() => params.page <= 1, [params.page]);
	const lastPage = useMemo(() => {
		if (response.total) {
			return Math.ceil(response.total / params.limit);
		}
		return 1;
	}, [response.total, params.limit]);

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
		response,
		setResponse,
		params,
		setParams,
		previousPage,
		nextPage,
		lastPage,
		start,
		end,
		previousDisabled,
	};
}
