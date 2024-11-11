import { createFileRoute } from "@tanstack/react-router";
import { BasePagination } from "@/components/BasePagination.tsx";
import { NavigationMain } from "@/components/NavigationMain.tsx";
import { ContextPaginatedApi, usePaginatedApi } from "@/hooks/api.ts";
import { RouteHome } from "@/routes.ts";
import { ProductsList } from "@/templates/ProductsList.tsx";

export const Route = createFileRoute(RouteHome)({
	component: RouteComponent,
});

export function RouteComponent() {
	const api = usePaginatedApi();
	return (
		<ContextPaginatedApi.Provider value={api}>
			<NavigationMain />
			<article className="relative flex flex-1 flex-col overflow-hidden">
				<ProductsList className="flex-1 overflow-auto" />
				<BasePagination	/>
			</article>
		</ContextPaginatedApi.Provider>
	);
}
