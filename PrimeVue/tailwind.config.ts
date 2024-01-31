import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: {
					b: colors.gray["400"],
				},
			},
		},
	},
	plugins: [],
};
