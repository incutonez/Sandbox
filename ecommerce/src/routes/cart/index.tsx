import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { optionsCartCheckoutLoad } from "@/hooks/user.ts";
import { RouteViewCart } from "@/routes.ts";

export const Route = createFileRoute(RouteViewCart)({
	component: RouteComponent,
});

function RouteComponent() {
	const { isFetching, data } = useQuery(optionsCartCheckoutLoad);
	if (isFetching) {
		return (
			<LoadingMask />
		);
	}
	console.log(data);
	return "Hello /cart/!";
}
