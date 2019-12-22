Ext.define('JefBox.model.Game', {
  extend: 'Ext.data.Model',
  requires: [
    'JefBox.model.Team'
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