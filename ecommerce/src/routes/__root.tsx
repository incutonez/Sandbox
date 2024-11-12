import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { queryClient } from "@/hooks/api.ts";
import { optionsUserLoad } from "@/hooks/user.ts";
import { NavigationMain } from "@/templates/NavigationMain.tsx";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<QueryClientProvider client={queryClient}>
			<MainComponent />
		</QueryClientProvider>
	);
}

function MainComponent() {
	const { isFetching } = useQuery(optionsUserLoad);
	if (isFetching) {
		return (
			<LoadingMask />
		);
	}

	return (
		<>
			<NavigationMain />
			<main className="relative flex size-full flex-col overflow-hidden">
				<Outlet />
			</main>
		</>
	);
}
