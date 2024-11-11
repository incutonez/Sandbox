import { useQuery } from "@tanstack/react-query";
import { CategoriesAPI } from "@/apiConfig.ts";

export const QueryKeyCategories = "Categories";

export function useLoadCategories() {
	return useQuery({
		queryKey: [QueryKeyCategories],
		queryFn: async () => {
			const { data } = await CategoriesAPI.getCategories();
			return data.data;
		},
	});
}
