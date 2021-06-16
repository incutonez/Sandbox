import {createApp} from 'vue';
import App from './App.vue';
import globals from '@/globals';
import Home from '@/components/Home.vue';
import Contacts from '@/components/Contacts.vue';
import Companies from '@/components/Companies.vue';
import Applications from '@/components/Applications.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/contacts',
  name: 'contacts',
  component: Contacts
}, {
  path: '/companies',
  name: 'companies',
  component: Companies
}, {
  path: '/applications',
  name: 'applications',
  component: Applications
}];

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
