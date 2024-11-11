import { createFileRoute } from "@tanstack/react-router";
import { LoadingMask } from "@/components/LoadingMask.tsx";
import { useLoadProduct } from "@/hooks/products.ts";
import { RouteViewProduct } from "@/routes.ts";

export const Route = createFileRoute(RouteViewProduct)({
	component: RouteComponent,
});

function RouteComponent() {
	const { productId } = Route.useParams();
	const { isFetching } = useLoadProduct(productId);
	if (isFetching) {
		return (
			<LoadingMask />
		);
	}
	return "Hello /products/$productId!";
}
