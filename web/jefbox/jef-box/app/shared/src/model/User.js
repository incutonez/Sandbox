Ext.define('JefBox.model.User', {
  extend: 'Ext.data.Model',

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Name',
    type: 'string'
  }, {
    name: 'IsActive',
    type: 'boolean'
  }, {
    name: 'CreateDate',
    type: 'date',
    dateFormat: 'c'
  }],

  proxy: {
    type: 'rest',
    url: 'api/users'
  }
});