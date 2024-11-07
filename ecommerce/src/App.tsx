import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationMain } from "@/components/NavigationMain.tsx";
import { ViewProducts } from "@/components/ViewProducts.tsx";
import { ContextStoreProducts } from "@/contexts.ts";
import { useProductStore } from "@/globals.ts";

const queryClient = new QueryClient();

export function App() {
	const productStore = useProductStore();
	return (
		<>
			<ContextStoreProducts.Provider value={productStore}>
				<NavigationMain />
				<article className="flex-1 overflow-auto">
					<Suspense fallback={"Loading..."}>
						<QueryClientProvider client={queryClient}>
							<ViewProducts />
						</QueryClientProvider>
					</Suspense>
				</article>
			</ContextStoreProducts.Provider>
		</>
	);
}
