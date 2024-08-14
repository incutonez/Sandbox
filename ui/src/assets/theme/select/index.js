export default {
	root: ({ props, state, parent }) => ({
		class: [
			// Display and Position
			"inline-flex",
			"relative max-h-8",

			// Shape
			"rounded-md",
			"shadow-sm",

			// Color and Background
			"bg-white dark:bg-surface-900",

			"border-0 border-surface-300",

			// Transitions
			"transition-all",
			"duration-200",

			// States
			{
				"ring-1 ring-inset ring-gray-b dark:ring-surface-700": !state.focused,
				"ring-1 ring-inset ring-sky-600 dark:ring-primary-400": state.focused,
			},

			// Misc
			"cursor-pointer",
			"select-none", {
				"opacity-60": props.disabled,
				"pointer-events-none": props.disabled,
				"cursor-default": props.disabled,
			},
		],
	}),
	label: ({ props, parent }) => ({
		class: [
			//Font
			"font-sans",
			"leading-6",
			"sm:text-sm",

			// Display
			"block",
			"flex-auto w-16",

			// Color and Background
			"bg-transparent",
			"border-0", {
				"text-black dark:text-white/80": props.modelValue != undefined,
				"text-surface-400 dark:text-surface-500": props.modelValue == undefined,
			},
			"placeholder:text-surface-400 dark:placeholder:text-surface-500",

			// Sizing and Spacing
			"w-[1%]",
			"py-1.5 px-2", {
				"pr-7": props.showClear,
			},

			//Shape
			"rounded-none",

			// Transitions
			"transition",
			"duration-200",

			// States
			"focus:outline-none focus:shadow-none",

			// Filled State *for FloatLabel
			{
				filled: parent.instance?.$name == "FloatLabel" && props.modelValue !== null,
			},

			// Misc
			"relative",
			"cursor-pointer",
			"truncate",
			"appearance-none",
		],
	}),
	dropdown: {
		class: [
			"sm:text-sm",
			// Flexbox
			"flex items-center justify-center",
			"shrink-0",

			// Color and Background
			"bg-transparent",
			"text-surface-500",

			// Size
			"w-6",

			// Shape
			"rounded-tr-md",
			"rounded-br-md",
		],
	},
	overlay: {
		class: [
			// Position
			"absolute top-0 left-0",
			"mt-0.5",

			// Shape
			"border-0",
			"rounded-md",
			"shadow-md",

			// Color
			"bg-white dark:bg-surface-800",
			"text-gray-800 dark:text-white/80",
			"ring-1 ring-inset ring-gray-b dark:ring-surface-700",
		],
	},
	listcontainer: {
		class: [
			// Sizing
			"max-h-[15rem]",

			// Misc
			"overflow-auto"],
	},
	list: {
		class: "p-1 list-none m-0",
	},
	option: ({ context }) => ({
		class: [
			// Font
			"sm:text-sm",
			"leading-none", {
				"font-normal": !context.selected,
				"font-semibold": context.selected,
			},

			// Position
			"relative",

			// Shape
			"border-0",
			"rounded-md",

			// Spacing
			"m-0",
			"py-2 px-4",

			// Colors
			{
				"bg-white dark:bg-surface-600/60 text-surface-700 dark:text-white/80": !context.selected,
			}, {
				"!bg-sky-200 dark:bg-primary-400 text-black dark:text-surface-700": context.selected,
			},

			//States
			"hover:bg-sky-100 dark:hover:bg-primary-400 dark:hover:text-surface-700",
			"focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

			// Transitions
			"transition-shadow",
			"duration-200",

			// Misc
			{
				"pointer-events-none cursor-default": context.disabled,
			}, {
				"cursor-pointer": !context.disabled,
			},
			"overflow-hidden",
			"whitespace-nowrap",
		],
	}),
	optionGroup: {
		class: [
			//Font
			"font-bold",

			// Spacing
			"m-0",
			"py-3 px-5",

			// Color
			"text-black dark:text-white/80",
			"bg-white dark:bg-surface-600/80",

			// Misc
			"cursor-auto",
		],
	},
	optionCheckIcon: "relative -ms-1.5 me-1.5 text-surface-700 dark:text-white/80 w-4 h-4",
	optionBlankIcon: "w-4 h-4",
	emptyMessage: {
		class: [
			// Font
			"leading-none",

			// Spacing
			"py-3 px-5",

			// Color
			"text-black dark:text-white/80", "bg-transparent"],
	},
	header: {
		class: [
			// Spacing
			"py-3 px-5",
			"m-0",

			//Shape
			"border-b",
			"rounded-tl-md",
			"rounded-tr-md",

			// Color
			"text-surface-700 dark:text-white/80",
			"bg-surface-100 dark:bg-surface-800",
			"border-surface-300 dark:border-surface-700",
		],
	},
	clearIcon: {
		class: [
			// Color
			"text-surface-500",

			// Position
			"absolute",
			"top-1/2",
			"right-12",

			// Spacing
			"-mt-2",
		],
	},
	loadingIcon: {
		class: "text-surface-400 dark:text-surface-500 animate-spin",
	},
	transition: {
		enterFromClass: "opacity-0 scale-y-[0.8]",
		enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
		leaveActiveClass: "transition-opacity duration-100 ease-linear",
		leaveToClass: "opacity-0",
	},
};
