Ext.define('JefBox.model.Game', {
  extend: 'JefBox.model.Crud',
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
    defaultValue: Enums.GameTypes.TRIVIA,
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
    getterName: 'getQuestionsStore',
    transform: false
  }],

  proxy: {
    type: 'rest',
    url: 'api/games',
    writer: {
      type: 'associationWriter',
      writeAllFields: true,
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