import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/hooks/api.ts";
import { ViewProducts } from "@/views/ViewProducts.tsx";

export function App() {
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ViewProducts />
			</QueryClientProvider>
		</>
	);
}
