import "./style.css";
import { createApp } from "vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";

const app = createApp(App);
app.use(VueQueryPlugin, {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				staleTime: 120000,
				refetchOnWindowFocus: false,
				retry: false,
			},
		},
	},
});

app.mount("#app");
