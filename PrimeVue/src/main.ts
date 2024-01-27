import "./style.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { TailwindTheme } from "@/assets/theme";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
	unstyled: true,
	pt: TailwindTheme,
});
app.mount("#app");
