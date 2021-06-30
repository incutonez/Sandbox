import {createApp} from 'vue';
import App from './App.vue';
import globals from '@/globals';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from '@/routes';

async function loadMain() {
  await globals.loadAppSettings();

  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes // short for `routes: routes`
  });

  const app = createApp(App);
  for (const key in globals.Constants) {
    app.config.globalProperties[key] = globals.Constants[key];
  }
  app.use(router);
  app.mount('#app');
}

loadMain();
