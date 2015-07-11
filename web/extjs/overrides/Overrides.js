Ext.onReady(function() {
  var numberField = Ext.create('Ext.form.field.Number', {
    fieldLabel: 'Can only type 1 digit',
    maxValue: 1,
    maxLength: 1,
    enforceMaxLength: true,
    myTestLogError: function() {
      this.logError('a test error');
    }
  });
  numberField.myTestLogError();
  Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    items: [numberField],
    tbar: [{
      xtype: 'button',
      text: 'Increase typable value by 1 digit',
      listeners: {
        click: function(button, event, eOpts) {
          numberField.setMaxValue(numberField.maxValue * 10);
          numberField.setMaxLengthFromMaxValue();
          numberField.setFieldLabel('Can only type ' + numberField.maxLength + ' digits');
          numberField.validate();
        }
      }
    }, {
      type: 'button',
      text: 'Decrease typable value by 1 digit',
      listeners: {
        click: function(button, event, eOpts) {
          numberField.setMaxValue(numberField.maxValue / 10);
          numberField.setMaxLengthFromMaxValue();
          numberField.setFieldLabel('Can only type ' + numberField.maxLength + ' digits');
          numberField.validate();
        }
      }
    }]
  });
});