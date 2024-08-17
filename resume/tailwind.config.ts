/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Calibri"],
		},
		extend: {
			colors: {
				blue: {
					resume: "#355269",
				},
			},
			spacing: {
				30: "7.5rem",
			},
		},
	},
	plugins: [],
};
