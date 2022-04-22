import Home from "ui/components/Home.vue";
import ContactsSearch from "ui/components/contacts/Search.vue";
import CompaniesSearch from "ui/components/companies/Search.vue";
import ApplicationsSearch from "ui/components/applications/Search.vue";
import ApplicationDetails from "ui/components/applications/Details.vue";
import CompaniesDetails from "ui/components/companies/Details.vue";

export default [{
  path: "/",
  name: "home",
  component: Home,
}, {
  path: "/contacts",
  name: "contactSearch",
  component: ContactsSearch,
}, {
  path: "/companies",
  name: "companySearch",
  component: CompaniesSearch,
  children: [{
    path: "create",
    name: "companyCreate",
    component: CompaniesDetails,
  }, {
    path: ":Id",
    name: "companyDetails",
    component: CompaniesDetails,
  }],
}, {
  path: "/applications",
  name: "applicationSearch",
  component: ApplicationsSearch,
  children: [{
    path: ":Id",
    name: "applicationDetails",
    component: ApplicationDetails,
  }],
}];
