import {createApp} from 'vue';
import App from './App.vue';
import globals from '@/globals';
import {createRouter, createWebHistory} from 'vue-router';
import routes from '@/routes';

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
});

const app = createApp(App);
for (const key in globals) {
  app.config.globalProperties[key] = globals[key];
}
app.use(router);
app.mount('#app');
