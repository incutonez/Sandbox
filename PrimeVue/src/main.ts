import "./style.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "material-symbols";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import { TailwindTheme } from "@/assets/theme";
import { router } from "@/router.ts";
import App from "./App.vue";

const app = createApp(App);
app.use(PrimeVue, {
	unstyled: true,
	pt: TailwindTheme,
});
app.use(router);
app.mount("#app");
