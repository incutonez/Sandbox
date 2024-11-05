import { IconSearch } from "@/assets/IconSearch.tsx";

export function NavigationMain() {
	return (
		<nav className="flex items-center bg-slate-700 p-4">
			<span className="w-64 text-4xl font-semibold text-amber-500">The Market</span>
			<input
				className="ml-2 h-10 w-80 overflow-hidden rounded-l px-2"
				type="text"
				placeholder="Search the Market"
			/>
			<button className="flex size-10 items-center justify-center rounded-r bg-slate-300">
				<IconSearch className="size-7 fill-slate-800" />
			</button>
		</nav>
	);
}
