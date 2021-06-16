import {createApp} from 'vue';
import App from './App.vue';
import globals from '@/globals';

const app = createApp(App);
for (const key in globals) {
  app.config.globalProperties[key] = globals[key];
}
app.mount('#app');
