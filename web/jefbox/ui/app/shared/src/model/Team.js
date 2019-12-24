Ext.define('JefBox.model.Team', {
  extend: 'JefBox.model.Crud',
  requires: [
    'JefBox.model.User'
  ],

  fields: [{
    name: 'Name',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Color',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'GameId',
    type: 'int',
    allowNull: true
  }, {
    name: 'OwnerId',
    type: 'int',
    defaultValue: UserProfile.getId()
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
      writeAllFields: true,
      allDataOptions: {
        associated: true
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