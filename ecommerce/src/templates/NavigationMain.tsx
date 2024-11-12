import { useQuery } from "@tanstack/react-query";
import { IconCartCheckout, IconSearch } from "@/assets/icons.tsx";
import { BaseButton } from "@/components/BaseButton.tsx";
import { FieldComboBox } from "@/components/FieldComboBox.tsx";
import { optionsCategories } from "@/hooks/categories.ts";
import { optionsCartLoad } from "@/hooks/user.ts";

export function NavigationMain() {
	const categories = useQuery(optionsCategories);
	const cart = useQuery(optionsCartLoad);
	console.log(cart.data);
	return (
		<nav className="flex items-center bg-slate-700 p-4">
			<span className="mr-40 text-4xl font-semibold text-amber-500">The Market</span>
			<section className="flex">
				<FieldComboBox
					options={categories.data ?? []}
					className="!h-10 !rounded-r-none"
				/>
				<input
					className="h-10 w-80 overflow-hidden px-2"
					type="text"
					placeholder="Search the Market"
				/>
				<BaseButton
					className="flex items-center justify-center rounded-l-none rounded-r"
					size="size-10"
					icon={IconSearch}
					iconCls="size-full"
				/>
			</section>
			<BaseButton
				className="ml-auto"
				size="size-10"
				icon={IconCartCheckout}
				iconCls="size-full"
				title="Checkout"
			/>
		</nav>
	);
}
