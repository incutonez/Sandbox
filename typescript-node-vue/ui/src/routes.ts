import Home from '@/components/Home.vue';
import ContactsSearch from '@/components/contacts/Search.vue';
import CompaniesSearch from '@/components/companies/Search.vue';
import ApplicationsSearch from '@/components/applications/Search.vue';
import ApplicationDetails from '@/components/applications/Details.vue';
import CompaniesDetails from '@/components/companies/Details.vue';

export default [{
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
  component: CompaniesSearch,
  children: [{
    path: 'create',
    name: 'companyCreate',
    component: CompaniesDetails
  }, {
    path: ':Id',
    name: 'companyDetails',
    component: CompaniesDetails
  }]
}, {
  path: '/applications',
  name: 'applicationSearch',
  component: ApplicationsSearch,
  children: [{
    path: ':Id',
    name: 'applicationDetails',
    component: ApplicationDetails
  }]
}];
