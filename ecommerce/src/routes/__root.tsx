import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { queryClient } from "@/hooks/api.ts";
import { NavigationMain } from "@/templates/NavigationMain.tsx";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<QueryClientProvider client={queryClient}>
					<NavigationMain />
					<main className="relative flex size-full flex-col overflow-hidden">
						<Outlet />
					</main>
				</QueryClientProvider>
			</>
		);
	},
});
