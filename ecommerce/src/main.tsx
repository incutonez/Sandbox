import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen.ts";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

const router = createRouter({
	routeTree,
	history: createHashHistory(),
});

/**
 * - useState, the lowest level of state management, and it's typically for primitive values
 * - createContext, basically like a provide/inject kinda pattern, but you should still pass in some sort of state
 * - Redux (RTK) is mostly for global state, where you create a global store
 * - RTK Query for normal data management
 * -- OR Tanstack Query (this gives you API management) + Zustand (this gives you local stores)
 * - Immer for mutations https://immerjs.github.io/immer/example-setstate
 * - useMemo for computed values
 */
createRoot(document.getElementById("app")!).render(<StrictMode>
	<RouterProvider router={router} />
</StrictMode>);
