import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svgLoader from "vite-svg-loader";

const __dirname = path.dirname(fileURLToPath(import.meta.url)).replace(/\\/g, "\\\\");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), svgLoader(), nodePolyfills({
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
	})],
	resolve: {
		alias: {
			"@": path.resolve(path.resolve(), "./src"),
		},
	},
	define: {
		__dirname: `"${__dirname}"`,
	},
});
