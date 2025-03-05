import "@/style.css";
import "highlight.js/styles/github.css";
import { createApp } from "vue";
import theme from "@incutonez/core-ui/theme";
import App from "@/App.vue";
import { router } from "@/router";

const app = createApp(App);
app.use(theme);
app.use(router);
app.mount("#app");
