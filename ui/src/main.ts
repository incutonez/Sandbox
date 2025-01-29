import "@/style.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "@/App.vue";
import { TailwindTheme } from "@/assets/theme";
import { router } from "@/router";

const app = createApp(App);
app.use(PrimeVue, {
	unstyled: true,
	pt: TailwindTheme,
});
app.use(router);
app.mount("#app");
