Ext.define('JefBox.model.game.RoundItem', {
  extend: 'Ext.data.Model',
  requires: [
    'JefBox.model.Upload',
    'JefBox.model.game.RoundItemChoice'
  ],

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Type',
    type: 'int',
    defaultValue: Enums.RoundItemTypes.TEXT,
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
    name: 'Points',
    type: 'number',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Question',
    type: 'string',
    validators: [{
      type: 'presence'
    }]
  }, {
    name: 'Answer',
    type: 'string'
  }, {
    name: 'GameId',
    type: 'int',
    allowNull: true
  }],

  hasOne: [{
    model: 'JefBox.model.Upload',
    associationKey: 'Upload',
    role: 'Upload',
    getterName: 'getUploadRecord',
    setterName: 'setUploadRecord'
  }],

  hasMany: [{
    model: 'JefBox.model.game.RoundItemChoice',
    associationKey: 'Choices',
    role: 'Choices',
    getterName: 'getChoicesStore'
  }],

  proxy: {
    type: 'memory'
  }
});