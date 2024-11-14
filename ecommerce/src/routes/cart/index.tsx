import { createFileRoute } from "@tanstack/react-router";
import { RouteViewCart } from "@/routes.ts";

export const Route = createFileRoute(RouteViewCart)({
	component: RouteComponent,
});

function RouteComponent() {
	return "Hello /cart/!";
}
