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
      allDataOptions: {
        associated: true,
        critical: true
      },
      partialDataOptions: {
        associated: true,
        critical: true
      },
      transform: function(data, request) {
        var users = data.Users;
        if (users) {
          data.Users = users.map(function(item) {
            return item.Id;
          });
        }
        return data;
      }
    }
  }
});