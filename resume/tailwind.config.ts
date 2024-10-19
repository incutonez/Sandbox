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
					resume: "#041E42",
				},
			},
			spacing: {
				30: "7.5rem",
			},
			height: {
				letter: "11in",
			},
			width: {
				letter: "8.5in",
			},
		},
	},
	plugins: [],
};
