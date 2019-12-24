Ext.define('JefBox.model.Game', {
  extend: 'JefBox.model.Crud',
  requires: [
    'JefBox.model.Team'
  ],

  fields: [{
    name: 'Name',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Type',
    type: 'int',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Room',
    type: 'string'
  }],

  hasMany: [{
    model: 'JefBox.model.Team',
    associationKey: 'Teams',
    role: 'Teams',
    getterName: 'getTeamsStore'
  }],

  proxy: {
    type: 'rest',
    url: 'api/games',
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
        var teams = data.Teams;
        if (teams) {
          data.Teams = teams.map(function(item) {
            return item.Id;
          });
        }
        return data;
      }
    }
  }
});