export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			sans: ["Open Sans", "sans-serif"],
		},
		extend: {
			spacing: {
				60: "3.75rem",
			},
			width: {
				90: "90%",
			},
		},
		screens: {
			sm: "500px",
			md: "750px",
			lg: "1000px",
		},
	},
	plugins: [],
};
