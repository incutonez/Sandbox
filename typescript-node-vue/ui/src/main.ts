import {createApp} from 'vue';
import App from './App.vue';
import globals from '@/globals';
import Home from '@/components/Home.vue';
import ContactsSearch from '@/components/contacts/Search.vue';
import CompaniesSearch from '@/components/companies/Search.vue';
import ApplicationsSearch from '@/components/applications/Search.vue';
import ApplicationDetails from '@/components/applications/Details.vue';
import {createRouter, createWebHistory} from 'vue-router';

const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/contacts',
  name: 'contactSearch',
  component: ContactsSearch
}, {
  path: '/companies',
  name: 'companySearch',
  component: CompaniesSearch
}, {
  path: '/applications',
  name: 'applicationSearch',
  component: ApplicationsSearch,
  children: [{
    path: ':id',
    name: 'applicationDetails',
    component: ApplicationDetails
  }]
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
