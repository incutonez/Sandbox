import { useQuery } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { ContextCart } from "@/contexts.ts";
import { optionsCartLoad, optionsUserLoad } from "@/hooks/user.ts";
import { NavigationMain } from "@/templates/NavigationMain.tsx";

export const Route = createRootRoute({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useQuery(optionsUserLoad);
	if (user.isFetching) {
		return (
			<LoadingMask />
		);
	}
	return (
		<MainComponent />
	);
}

function MainComponent() {
	const cart = useQuery(optionsCartLoad);
	if (cart.isFetching) {
		return (
			<LoadingMask />
		);
	}

	return (
		<ContextCart.Provider value={cart}>
			<NavigationMain />
			<main className="relative flex size-full flex-col overflow-hidden">
				<Outlet />
			</main>
		</ContextCart.Provider>
	);
}
