Ext.define('JefBox.BaseDialog', {
  extend: 'Ext.Dialog',
  alias: 'widget.baseDialog',

  autoShow: true,
  closable: true,
  maximizable: true,
  minimizable: true,
  height: 500,
  width: 1000,
  layout: 'fit',

  initialize: function() {
    var me = this;
    me.callParent();
    if (me.minimizable) {
      me.addTool({
        type: 'minimize',
        scope: me,
        handler: 'onMinimizeDialog'
      });
    }
    if (me.autoShow) {
      me.show();
    }
  },

  onMinimizeDialog: function() {
    this.hide();
    this.fireEvent('minimize', this);
  }
});