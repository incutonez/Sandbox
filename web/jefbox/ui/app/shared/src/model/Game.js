Ext.define('JefBox.model.Game', {
  extend: 'Ext.data.Model',
  requires: [
    'JefBox.AssociationWriter',
    'JefBox.model.Team',
    'JefBox.model.game.Question'
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
  }, {
    model: 'JefBox.model.game.Question',
    associationKey: 'Questions',
    role: 'Questions',
    getterName: 'getQuestionsStore'
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