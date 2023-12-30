import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import postcss from "./postcss.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, "\\\\");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		nodePolyfills({
			include: ["path", "stream", "util"],
			exclude: ["http"],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
			overrides: {
				fs: "memfs",
			},
			protocolImports: true,
		}),
	],
	base: "/Sandbox/",
	css: {
		postcss,
	},
	resolve: {
		alias: {
			ui: path.resolve(path.resolve(), "./src"),
		},
	},
	build: {
		cssCodeSplit: false,
		assetsInlineLimit: 100000,
		assetsDir: ".",
	},
	define: {
		__dirname: `"${__dirname}"`,
	},
});
