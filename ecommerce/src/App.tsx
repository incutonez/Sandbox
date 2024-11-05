import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationMain } from "@/components/NavigationMain.tsx";
import { ViewProducts } from "@/components/ViewProducts.tsx";

const queryClient = new QueryClient();

export function App() {
	console.log("App");
	return (
		<>
			<NavigationMain />
			<article className="flex-1 overflow-auto">
				<Suspense fallback={"Loading..."}>
					<QueryClientProvider client={queryClient}>
						<ViewProducts />
					</QueryClientProvider>
				</Suspense>
			</article>
		</>
	);
}
