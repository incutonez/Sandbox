<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 cmp="label"
                 :class="fieldContainerCls">
    <FlexContainer v-if="showLabel"
                   class="field-label"
                   cmp="label"
                   :width="labelWidth"
                   :align="FlexAlignments.CENTER">
      {{ label }}{{ labelSeparator }}
    </FlexContainer>
    <label class="field-input-container">
      <input v-model="value"
             :class="`${fieldInputCls} field-input-checkbox`"
             :type="type"
             :required="isRequired"
             :disabled="isDisabled"
             :readonly="isReadOnly">
      <span :class="`field-checkbox ${fieldCls}`">
      </span>
      <span class="field-checkbox-label">
        {{ boxLabel }}
      </span>
    </label>
  </FlexContainer>
</template>

<script>
/**
 * @prototype https://jsfiddle.net/incutonez/xtfus12w/
 */
import {defineComponent} from 'vue';
import Field from './Field';

export default defineComponent({
  name: 'JefCheckbox',
  extends: Field,
  props: {
    fieldCls: {
      type: String,
      default: ''
    },
    boxLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'checkbox'
    }
  }
});
</script>

<style lang="scss">
.field-input-container {
  display: block;
  cursor: pointer;
  margin-top: $checkbox-margin-top;
  height: $checkbox-height;
  position: relative;

  // Hiding browser's default checkbox, as it's impossible to style
  .field-input-checkbox {
    display: none;
  }

  // Creating a "shadow" checkbox through a span and ::before styling
  .field-checkbox {
    display: inline-block;
    border: $field-input-border;
    height: $checkbox-height;
    width: $checkbox-width;
    padding: $checkbox-padding;
  }

  .field-required ~ .field-checkbox {
    border-color: $field-input-border-color-required;
  }

  .field-checkbox:hover {
    background-color: lighten($field-input-border-color, 25%);
  }

  .field-input-checkbox:checked ~ .field-checkbox {
    background-color: $checkbox-background-color-checked;
    border-color: $checkbox-background-color-checked;
  }

  .field-input-checkbox:checked ~ .field-checkbox::before {
    content: $checkbox-icon;
    position: absolute;
    line-height: 100%;
    font-size: $checkbox-icon-size;
    width: $checkbox-icon-size;
    height: $checkbox-icon-size;
    text-align: center;
    font-weight: 600;
    color: $checkbox-color-checked;
  }

  .field-checkbox-label {
    position: absolute;
    margin-left: 5px;
    font-size: $checkbox-icon-size;
  }
}
</style>
