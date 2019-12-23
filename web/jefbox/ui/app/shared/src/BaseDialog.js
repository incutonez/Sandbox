Ext.define('JefBox.BaseDialog', {
  extend: 'Ext.Dialog',
  alias: 'widget.baseDialog',

  viewModel: {
    data: {
      cancelBtnText: 'Cancel',
      saveBtnText: 'Save'
    },
    formulas: {
      saveBtnDisabled: function(get) {
        return false;
      }
    }
  },

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
    let bbar = this.getBbar();
    if (isCrudDialog) {
      if (bbar) {
        bbar.add([{
          xtype: 'button',
          handler: 'onClickSave',
          text: 'Save',
          bind: {
            disabled: '{disableSaveButton}'
          },
          listeners: {
            afterrender: function(button) {
              console.log(button);
            }
          }
        }, {
          xtype: 'button',
          text: 'Cancel'
        }]);
      }
      else {
        this.setBbar({
          layout: {
            pack: 'end'
          },
          items: [{
            xtype: 'button',
            handler: 'onClickSave',
            text: 'Save',
            align: 'right',
            bind: {
              text: '{saveBtnText}',
              disabled: '{saveBtnDisabled}'
            }
          }, {
            xtype: 'button',
            align: 'right',
            text: 'Cancel',
            bind: {
              text: '{cancelBtnText}'
            }
          }]
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