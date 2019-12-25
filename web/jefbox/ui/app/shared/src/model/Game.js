Ext.define('JefBox.model.Game', {
  extend: 'JefBox.model.Crud',
  requires: [
    'JefBox.AssociationWriter',
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
      type: 'associationWriter',
      allDataOptions: {
        associated: true,
        critical: true
      },
      partialDataOptions: {
        associated: true,
        critical: true
      }
    }
  }
});