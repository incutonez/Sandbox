export default {
	root: {
		class: [
			// Sizing and Shape
			"rounded-md",
			// Colors
			"bg-white shadow-lg dark:bg-surface-700",
			"text-surface-700 dark:text-white/80",
			"ring-1 ring-surface-200 dark:ring-surface-700",
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
		class: [
			"first:border-t-0 border-t border-gray-b",
			"first:rounded-tr-md first:rounded-tl-md last:rounded-br-md last:rounded-bl-md",
			// Hides the selection rectangle corner overflow for first/last
			"overflow-hidden",
		],
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
	submenuicon: {
		class: [
			// Position
			"ml-auto",
		],
	},
	submenu: {
		class: [
			"rounded-md",

			// Spacing
			"p-0",
			"ml-1",
			"list-none",

			// Shape
			"shadow-none sm:shadow-md",
			"border-0",

			// Position
			"static sm:absolute",
			"z-10",

			// Color
			"bg-white dark:bg-surface-700",
		],
	},
	separator: {
		class: "border-t border-surface-200 dark:border-surface-600 my-1",
	},
};
