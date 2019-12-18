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
    allowBlank: false
  }, {
    name: 'IsActive',
    type: 'boolean'
  }, {
    name: 'CreateDate',
    type: 'date',
    dateFormat: 'c'
  }, {
    name: 'UpdateDate',
    type: 'date',
    dateFormat: 'c'
  }, {
    // Used only on creating a user
    name: 'Password',
    type: 'string',
    allowBlank: false
  }],

  proxy: {
    type: 'rest',
    url: 'api/users'
  }
});