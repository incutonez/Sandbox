Ext.define('JefBox.model.game.Question', {
  extend: 'Ext.data.Model',

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Type',
    type: 'int',
    // TODOJEF: There's an issue here... this model is trying to get required sooner than it should... something with
    // the stores being enums, I think
    defaultValue: Enums.QuestionTypes.TEXT,
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Information',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Answer',
    type: 'string'
  }],

  proxy: {
    type: 'memory'
  }
});