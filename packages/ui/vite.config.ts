import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		plugins: [vue(), svgLoader(), tailwindcss()],
		base: mode === "GitHubPages" ? "/Sandbox/" : "",
		build: {
			outDir: "../dist",
		},
		resolve: {
			alias: [{
				find: "@",
				replacement: path.resolve(path.resolve(), "./src"),
			}, {
				/**
				 * Apparently needed for mime-types package
				 * Source: https://github.com/jshttp/mime-types/issues/124
				 */
				find: "path",
				replacement: "path-browserify",
			}],
		},
	};
});
