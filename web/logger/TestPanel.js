Ext.define('TestPanel', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.testPanel',
  mixins: ['LoggerMixin'],

  /** @constructor */
  constructor: function(config) {
    this.items = [];
    var errorButton = this.getErrorButton();
    var warningButton = this.getWarningButton();
    if (errorButton) {
      this.items.push(errorButton);
    }
    if (warningButton) {
      this.items.push(warningButton);
    }
    this.callParent(arguments);
  },

  /**
   * @private
   * @event click
   * This handler will be triggered when the error button is clicked.
   */
  onClickErrorButton: function(button, event, eOpts) {
    this.logError('logError button was clicked!');
  },

  /**
   * @private
   * @event click
   * This handler will be triggered when the warning button is clicked.
   */
  onClickWarningButton: function(button, event, eOpts) {
    this.logWarning('logWarning button was clicked!');
  },

  /**
   * Getter: this.errorButton
   * @return {Ext.button.Button} button
   * Returns the error button for the panel
   */
  getErrorButton: function() {
    var button = this.errorButton;
    if (!button) {
      button = this.errorButton = Ext.create('Ext.button.Button', {
        text: 'Trigger logError'
      });
      if (!button) {
        this.logError('button is undefined');
      }
      else {
        button.on('click', this.onClickErrorButton, this);
      }
    }
    return button;
  },

  /**
   * Getter: this.warningButton
   * @return {Ext.button.Button} button
   * Returns the warning button for the panel
   */
  getWarningButton: function() {
    var button = this.warningButton;
    if (!button) {
      button = this.warningButton = Ext.create('Ext.button.Button', {
        text: 'Trigger logWarning'
      });
      if (!button) {
        this.logError('button is undefined');
      }
      else {
        button.on('click', this.onClickWarningButton, this);
      }
    }
    return button;
  }
});