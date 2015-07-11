/**
 * @author Jef Harkay
 * @docauthor Jef Harkay
 *
 * Overriding the NumberField class, so we can add a maxLength setter and
 * shortcut method for setting the max length based on the max value length
 */
Ext.define('My.namespace.overrides.NumberField', {
  override: 'Ext.form.field.Number',

  /**
   * Setter: this method will set the maxLength variable on our NumberField
   * class, and on its actual dom element, so we can actually restrict the user
   * from entering over the maxLength
   * @param {Number} maxLength
   */
  setMaxLength: function(maxLength) {
    this.maxLength = maxLength;
    var inputEl = this.inputEl;
    if (inputEl) {
      var domEl = inputEl.dom;
      if (domEl) {
        domEl.maxLength = maxLength;
      }
    }
  },

  /**
   * Shortcut method for setting the maxLength based on the maxValue... if
   * maxValue is not set, then 0 is used, which means the maxLength will be 1
   */
  setMaxLengthFromMaxValue: function() {
    var maxValue = this.maxValue || 0;
    if (maxValue >= 0) {
      this.setMaxLength(maxValue.toString().length);
    }
  }
});