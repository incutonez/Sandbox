import { createApp } from "vue";
import core from "@incutonez/core-ui/dist/CoreUI.js";
import "./index.css";
import App from "./App.vue";

const app = createApp(App);
app.use(core);
app.mount("#app");
