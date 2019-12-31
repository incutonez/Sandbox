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
    defaultValue: Enums.QuestionTypes.TEXT,
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Round',
    type: 'int',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Order',
    type: 'int',
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