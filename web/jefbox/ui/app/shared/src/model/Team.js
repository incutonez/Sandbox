Ext.define('JefBox.model.Team', {
  extend: 'Ext.data.Model',
  requires: [
    'JefBox.model.User'
  ],

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Name',
    type: 'string'
  }, {
    name: 'Color',
    type: 'string'
  }],

  hasMany: [{
    model: 'JefBox.model.User',
    associationKey: 'Users',
    getterName: 'getUsersStore',
    role: 'Users'
  }],

  proxy: {
    type: 'rest',
    url: 'api/teams',
    writer: {
      type: 'json',
      partialDataOptions: {
        associated: true,
        critical: true
      }
    }
  }
});