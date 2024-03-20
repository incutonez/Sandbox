export default {
	root: {
		class: [
			"relative",

			// Alignment
			"inline-flex",
			"align-bottom",

			// Size
			"w-6 h-6",

			// Misc
			"select-none",
		],
	},
	box: ({ props, context }) => ({
		class: [
			// Alignment
			"flex",
			"items-center",
			"justify-center",

			// Size
			"w-full h-full",

			// Shape
			"rounded",
			"border border-gray-b",

			// Colors
			"text-surface-600", {
				"bg-white dark:border-surface-700 dark:bg-surface-900": !context.checked && !props.invalid,
				"border-sky-600 bg-sky-200 dark:border-primary-400 dark:bg-primary-400": context.checked,
			},

			// Invalid State
			{
				"border-red-500 dark:border-red-400": props.invalid,
			}, {
				"ring-2 ring-sky-600 dark:ring-primary-400": !props.disabled && context.focused,
				"cursor-default opacity-60": props.disabled,
			},

			// States
			{
				"peer-focus-visible:ring-2 peer-focus-visible:ring-sky-600 dark:peer-focus-visible:ring-primary-400": !props.disabled,
				"cursor-default opacity-60": props.disabled,
			},

			// Transitions
			"transition-colors",
			"duration-200",
		],
	}),
	input: {
		class: [
			"peer",
			"cursor-pointer",

			// Size
			"w-full h-full",

			// Position
			"absolute",
			"top-0 left-0",
			"z-10",

			// Spacing
			"p-0",
			"m-0",

			// Shape
			"rounded",
			"border",

			// Shape
			"opacity-0",
			"rounded-md",
			"outline-none",
			"border-2 border-gray-b dark:border-surface-700",

			// Misc
			"appearance-none",
		],
	},
	icon: {
		class: [
			// Font
			"text-normal",

			// Size
			"w-4 h-4",

			// Colors
			"text-sky-600 dark:text-surface-900",

			// Transitions
			"transition-all",
			"duration-200",
		],
	},
};
