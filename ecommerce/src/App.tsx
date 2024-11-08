import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationMain } from "@/components/NavigationMain.tsx";
import { ContextProductsStore, useProductsStore } from "@/hooks/products.ts";
import { ViewProducts } from "@/views/ViewProducts.tsx";

const queryClient = new QueryClient();

export function App() {
	const productStore = useProductsStore();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ContextProductsStore.Provider value={productStore}>
					<NavigationMain />
					<ViewProducts />
				</ContextProductsStore.Provider>
			</QueryClientProvider>
		</>
	);
}
