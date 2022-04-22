import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "ui": path.resolve(path.resolve(), "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"./src/sass/var/globals.scss\";",
      },
    },
  },
});
