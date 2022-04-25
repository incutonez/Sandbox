import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postcss from "ui/postcss.config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/Sandbox/",
  css: {
    postcss,
  },
  resolve: {
    alias: {
      "ui": path.resolve(path.resolve(), "./src"),
    },
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000,
    assetsDir: ".",
  },
});
