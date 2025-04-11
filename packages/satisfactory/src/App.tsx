import "./App.css";
import { useState } from "react";
import { loadInventory } from "@/api/inventory.ts";
import { TableItems } from "@/components/TableItems.tsx";

export function App() {
	const [inventory, setInventory] = useState(loadInventory());
	return (
		<>
			<main className="flex">
				<TableItems />
			</main>
		</>
	);
}
