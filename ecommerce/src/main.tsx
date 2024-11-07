import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/App.tsx";

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
	<App />
</StrictMode>);
