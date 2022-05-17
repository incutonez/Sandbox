import { createApp } from "vue";
import core from "@incutonez/core-ui/dist/CoreUI.js";
import "./index.css";
import App from "./App.vue";
import { loadImages } from "ui/Image.js";

async function main() {
  /* For the purposes of this app, we front load all of the images before the app is created, just so
   * we can cache them and not have to deal with loading individually */
  await loadImages();

  const app = createApp(App);
  app.use(core);
  app.mount("#app");
}

main();
