import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig(function(_a) {
	const mode = _a.mode;
	return {
		plugins: [vue()],
		base: mode === "GitHubPages" ? "/Sandbox/resume" : "",
		build: {
			outDir: "../dist/resume",
		},
		resolve: {
			alias: [{
				find: "@",
				replacement: path.resolve(path.resolve(), "./src"),
			}],
		},
	};
});
