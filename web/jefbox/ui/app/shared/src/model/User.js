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
    name: 'AccessLevel',
    type: 'int'
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
  }, {
    name: 'accessLevelDisplay',
    type: 'string',
    depends: ['AccessLevel'],
    convert: function(value, record) {
      return Enums.AccessLevels && Enums.AccessLevels.getDisplayValue(record.get('AccessLevel'));
    }
  }],

  proxy: {
    type: 'rest',
    url: 'api/users'
  }
});