Table of contents
=================

- [Shared](#shared)
    - [Run](#shared-run)
- [Node.js API](#api)
    - [Run](#api-run)
    - [URLs](#api-urls)
        - [Companies](#api-urls-companies)
        - [Contacts](#api-urls-contacts)
        - [Applications](#api-urls-applications)
- [Vue.js UI](#vue)
    - [Run](#vue-run)

# <a name="shared"></a>Shared (TypeScript)

The purpose of this directory is to contain any shared code between the UI and API. The Vue.js UI consumes it directly
as TypeScript code and handles any transpiling, but the API requires that the directory be transpiled into JS, in order
for the modules to be imported.

## <a name="shared-run"></a>Run

```
(optional) cd shared; npm install; cd ..
npm run shared
```

# <a name="api"></a> Node.js API

## <a name="api-run"></a> Run

```
(optional) cd api; npm install; cd ..
npm run api
```

## <a name="api-urls"></a> Urls

### <a name="api-urls-companies"></a> Companies

```
GET api/companies
```

### <a name="api-urls-contacts"></a> Contacts

```
GET api/contacts
```

### <a name="api-urls-applications"></a> Applications

```
GET api/applications
```

# <a name="vue"></a> Vue.js UI

## <a name="vue-run"></a> Run

```
(optional) cd ui; npm install; cd ..
npm run ui
```
