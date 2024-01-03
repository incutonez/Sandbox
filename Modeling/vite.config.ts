import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			script: {
				defineModel: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(path.resolve(), "./src"),
		},
	},
});
