import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [vue(), svgLoader()],
		base: mode === "GitHubPages" ? "/Sandbox/" : "",
		resolve: {
			alias: {
				"@": path.resolve(path.resolve(), "./src"),
			},
		},
	};
});
