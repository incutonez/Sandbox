export default {
	root: {
		class: [
			// Sizing and Shape
			"rounded-md",
			// Colors
			"bg-white shadow-lg dark:bg-surface-700",
			"text-surface-700 dark:text-white/80",
			"ring-1 ring-surface-200 dark:ring-surface-700",
			// Hides the selection rectangle from overflowing the overall rounded corners
			"overflow-hidden",
		],
	},
	menu: {
		class: [
			// Spacings and Shape
			"list-none",
			"m-0",
			"p-0",
			"outline-none",
		],
	},
	menuitem: {
		class: ["first:border-t-0 border-t border-gray-b"],
	},
	content: ({ context }) => ({
		class: [
			// Colors
			{
				"text-black dark:text-surface-0": !context.focused,
				"bg-gray-200 text-black dark:bg-surface-300/10 dark:text-primary-400": context.focused,
			},

			// Transitions
			"transition-shadow",
			"duration-200",

			// States
			"hover:text-black dark:hover:text-primary-400",
			"hover:bg-sky-200 dark:hover:bg-surface-400/10",
		],
	}),
	action: {
		class: [
			"relative",

			// Font
			"font-medium",

			// Flexbox
			"flex",
			"items-center",

			// Spacing
			"px-2 py-1.5",

			// Misc
			"no-underline",
			"overflow-hidden",
			"cursor-pointer",
			"select-none",
		],
	},
	icon: {
		class: [
			// Spacing
			"mr-2",
			"text-xs",
		],
	},
	label: {
		class: ["text-xs"],
	},
	submenuheader: {
		class: [
			// Font
			"font-semibold",
			"text-xs leading-6",

			// Spacing
			"m-0 ",
			"py-1",
			"px-3",

			// Shape
			"rounded-tl-none",
			"rounded-tr-none",

			// Colors
			"bg-surface-0 dark:bg-surface-700",
			"text-surface-600 dark:text-surface-0/60",
		],
	},
	transition: {
		enterFromClass: "opacity-0 scale-y-[0.8]",
		enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
		leaveActiveClass: "transition-opacity duration-100 ease-linear",
		leaveToClass: "opacity-0",
	},
};
