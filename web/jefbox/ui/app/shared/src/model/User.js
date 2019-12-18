Ext.define('JefBox.model.User', {
  extend: 'Ext.data.Model',

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'UserName',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'IsActive',
    type: 'boolean',
    persist: false
  }, {
    name: 'CreateDate',
    type: 'date',
    dateFormat: 'c',
    persist: false
  }, {
    name: 'UpdateDate',
    type: 'date',
    dateFormat: 'c',
    persist: false
  }, {
    // Used only on creating a user
    name: 'Password',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }],

  proxy: {
    type: 'rest',
    url: 'api/users'
  }
});