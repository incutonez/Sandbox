Ext.define('JefBox.model.User', {
  extend: 'JefBox.model.Crud',

  fields: [{
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
    // Used only on creating a user
    name: 'Password',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'IsAdmin',
    type: 'boolean',
    persist: false
  }, {
    name: 'accessLevelDisplay',
    type: 'string',
    persist: false,
    depends: ['AccessLevel'],
    convert: function(value, record) {
      return Enums.AccessLevels && Enums.AccessLevels.getDisplayValue(record.get('AccessLevel'));
    }
  }],

  hasMany: [{
    model: 'JefBox.model.Team',
    associationKey: 'Teams',
    getterName: 'getTeamsStore',
    role: 'Teams'
  }],

  proxy: {
    type: 'rest',
    url: 'api/users',
    writer: {
      type: 'json',
      writeAllFields: true
    }
  }
});