export default {
	root: ({ props, state }) => ({
		class: [
			// Display and Position
			"inline-flex",
			"relative max-h-8",

			// Shape
			"rounded-md",
			"shadow-sm",

			// Color and Background
			"bg-white dark:bg-surface-900",

			// States
			{
				"ring-1 ring-inset ring-gray-b dark:ring-surface-700": !state.focused,
				"ring-1 ring-inset ring-sky-600 dark:ring-primary-400": state.focused,
			},

			// Misc
			"cursor-default",
			"select-none", {
				"opacity-60": props.disabled,
				"pointer-events-none": props.disabled,
			},
		],
	}),
	input: ({ props }) => ({
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
				"text-surface-800 dark:text-white/80": props.modelValue,
				"text-surface-400 dark:text-surface-500": !props.modelValue,
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

			// Misc
			"relative",
			"cursor-pointer",
			"truncate",
			"appearance-none",
		],
	}),
	trigger: {
		class: [
			//Font
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
			"cursor-pointer",
		],
	},
	panel: {
		class: [
			// Position
			"absolute top-0 left-0",
			"mt-2",

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
	wrapper: {
		class: [
			// Sizing
			"max-h-[15rem]",

			// Misc
			"overflow-auto"],
	},
	list: {
		class: "p-1 list-none m-0",
	},
	item: ({ context }) => ({
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

			// Color
			{
				"bg-white dark:bg-surface-600/60 text-surface-700 dark:text-white/80": !context.selected,
			}, {
				"!bg-sky-200 dark:bg-primary-400 text-black dark:text-surface-700": context.selected,
			},

			//States
			"hover:bg-sky-100 dark:hover:bg-primary-400 dark:hover:text-surface-700",
			"focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

			// Misc
			"cursor-pointer",
			"overflow-hidden",
			"whitespace-nowrap",
		],
	}),
	itemgroup: {
		class: [
			//Font
			"font-bold",
			"sm:text-sm",

			// Spacing
			"m-0",
			"py-2 px-4",

			// Color
			"text-surface-800 dark:text-white/80",
			"bg-surface-0 dark:bg-surface-600/80",

			// Misc
			"cursor-auto",
		],
	},
	emptymessage: {
		class: [
			// Font
			"leading-none",
			"sm:text-sm",

			// Spacing
			"py-2 px-4",

			// Color
			"text-surface-800 dark:text-white/80",
			"bg-transparent",
		],
	},
	header: {
		class: [
			// Spacing
			"p-0",
			"m-0",

			//Shape
			"rounded-tl-md",
			"rounded-tr-md",

			// Color
			"text-surface-700 dark:text-white/80",
			"bg-surface-100 dark:bg-surface-800",
		],
	},
	filtercontainer: {
		class: "relative",
	},
	filterinput: {
		class: [
			// Font
			"font-sans",
			"leading-none",
			"sm:text-sm",

			// Sizing
			"py-1.5 px-3",
			"pr-7",
			"-mr-7",
			"w-full",

			//Color
			"text-surface-700 dark:text-white/80",
			"bg-surface-0 dark:bg-surface-900",
			"placeholder:text-surface-400",
			"ring-1 ring-inset ring-surface-300 dark:ring-surface-700",

			// Shape
			"border-0",
			"rounded-tl-md",
			"rounded-tr-md",
			"appearance-none",

			// States
			"focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0",
			"focus:ring-primary-600 dark:focus:ring-primary-500",

			// Misc
			"appearance-none",
		],
	},
	filtericon: {
		class: ["absolute", "top-1/2 right-3", "-mt-2"],
	},
	clearicon: {
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
	transition: {
		enterFromClass: "opacity-0 scale-y-[0.8]",
		enterActiveClass: "transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]",
		leaveActiveClass: "transition-opacity duration-100 ease-linear",
		leaveToClass: "opacity-0",
	},
};
