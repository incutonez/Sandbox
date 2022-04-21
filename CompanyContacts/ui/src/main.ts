import {createApp} from 'vue';
import globals from '@/globals';
import {createRouter, createWebHashHistory} from 'vue-router';

async function loadMain() {
  // Let's make sure all of our global vars are available before we go importing
  await globals.loadAppSettings();
  const App = await import('./App.vue');
  const app = createApp(App.default);
  for (const key in globals.Constants) {
    app.config.globalProperties[key] = globals.Constants[key];
  }
  const routes = await import('./routes');
  const router = createRouter({
    // Use WebHash, so we don't reload the entire app on entering a new URL in the address bar
    history: createWebHashHistory(),
    routes: routes.default
  });
  app.use(router);
  app.mount('#app');
  // TODO: Only allow in debug mode
  window.App = app;
}

loadMain();
