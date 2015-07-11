Ext.Loader.setConfig({
  enabled: true
});

Ext.define('RadioButtons', {
  extend : 'Ext.form.RadioGroup',
  alias  : 'widget.radiobuttons',
  constructor: function (config) {
    Ext.apply(this, {
      defaults: {
        xtype: 'radio',
        name: config.name
      },
      items: [
        {
          boxLabel: 'Radio 1',
          inputValue: '1'
        },
        {
          boxLabel: 'Radio 2',
          inputValue: '2'
        }
      ]
    });
    this.callParent(arguments);
  }
});
    
Ext.application({
  name: 'Test',
  launch: function() {
    Ext.create('Ext.Viewport', {
      layout: 'border',
      items: [{
        xtype: 'panel',
        region: 'center',
        title: 'buttons',
        items: [{
          xtype: 'form',
          items: [{
            xtype: 'radiobuttons',
            fieldLabel: 'group 1',
            name: 'radiogroup1'
          }, {
            xtype: 'radiobuttons',
            fieldLabel: 'group 2',
            name: 'radiogroup2'
          }]
        }]
      }]
    });
  }
});