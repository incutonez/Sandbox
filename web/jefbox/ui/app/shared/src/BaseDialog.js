Ext.define('JefBox.BaseDialog', {
  extend: 'Ext.Dialog',
  alias: 'widget.baseDialog',

  height: 500,
  width: 1000,
  layout: 'fit',
  maximizable: true,
  closable: true,
  config: {
    autoShow: true,
    minimizable: true,
    isCrudDialog: false
  },

  updateMinimizable: function(minimizable) {
    let me = this;
    if (minimizable) {
      me.addTool({
        type: 'minimize',
        scope: me,
        handler: 'onMinimizeDialog'
      });
    }
  },

  updateAutoShow: function(autoShow) {
    if (autoShow) {
      this.show();
    }
  },

  updateIsCrudDialog: function(isCrudDialog) {
    let buttons = this.getButtons();
    if (isCrudDialog) {
      if (buttons) {
        buttons.add({
          save: 'onClickSave',
          cancel: 'onClickCancel'
        });
      }
      else {
        this.setButtons({
          save: 'onClickSave',
          cancel: 'onClickCancel'
        });
      }
    }
  },

  /**
   * @abstract
   * Implement this class if you have isCrudDialog set to true
   */
  onClickSave: Ext.emptyFn,

  /**
   * @abstract
   * Implement this class if you have isCrudDialog set to true
   */
  onClickCancel: Ext.emptyFn,

  onMinimizeDialog: function() {
    this.hide();
    this.fireEvent('minimize', this);
  }
});