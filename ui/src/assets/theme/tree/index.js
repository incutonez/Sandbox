export default {
	root: {
		class: [
			// Shape
			"rounded-md",

			// Color
			"bg-surface-0 dark:bg-surface-800",
			"text-surface-700 dark:text-white/80",
			"border-0 ring-1 ring-inset ring-gray-b dark:ring-surface-700 focus-visible:outline-none",
			"[&_[data-pc-name=pcfilter]]:w-full",
		],
	},
	wrapper: {
		class: ["overflow-auto"],
	},
	container: {
		class: [
			// Spacing
			"m-0 p-0",

			// Misc
			"list-none overflow-auto",
		],
	},
	node: {
		class: ["p-1", "text-sm", "rounded-md focus-visible:outline-none"],
	},
	nodeContent: ({ context, props }) => ({
		class: [
			// Flex and Alignment
			"flex items-center",

			// Shape
			"rounded-md",

			// Spacing
			"p-2 gap-2",

			// Colors
			"text-surface-600 dark:text-white/70", {
				"bg-sky-200 font-semibold": context.selected,
			},

			// States
			{
				"hover:bg-surface-50 dark:hover:bg-surface-700/40": (props.selectionMode == "single" || props.selectionMode == "multiple") && !context.selected,
			},

			// Transition
			"transition-shadow duration-200", {
				"cursor-pointer select-none": props.selectionMode == "single" || props.selectionMode == "multiple",
			},
		],
	}),
	nodeToggleButton: ({ context }) => ({
		class: [
			// Flex and Alignment
			"inline-flex items-center justify-center",

			// Shape
			"border-0 rounded-full",

			// Size
			"size-6",

			// Colors
			"bg-transparent", {
				"text-surface-500 dark:text-white": !context.selected,
				"text-primary-600 dark:text-white": context.selected,
				"hidden pr-2": context.leaf,
			},

			// States
			"hover:bg-surface-200/20 dark:hover:bg-surface-500/20",
			"focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50",

			// Transition
			"transition duration-200",

			// Misc
			"cursor-pointer select-none",
		],
	}),
	nodeIcon: ({ context }) => ({
		class: [
			// Space
			{
				hidden: context.leaf,
			}, "mr-2",

			// Color
			"text-surface-600 dark:text-white/70"],
	}),
	nodeChildren: {
		class: ["m-0 list-none p-0 pl-2 mt-1"],
	},
	loadingIcon: {
		class: ["text-surface-500 dark:text-surface-0/70", "absolute top-[50%] right-[50%] -mt-2 -mr-2 animate-spin"],
	},
};
