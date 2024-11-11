import { QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { queryClient } from "@/hooks/api.ts";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<QueryClientProvider client={queryClient}>
					<Outlet />
				</QueryClientProvider>
			</>
		);
	},
});
