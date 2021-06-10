<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :border="false"
                 cmp="label"
                 class="field-container"
                 :align-self="FlexAlignments.START">
    <FlexContainer v-if="showLabel"
                   :class="fieldLabelCls"
                   cmp="label"
                   width="auto"
                   :border="false"
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
      <span class="field-checkbox" />
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
    type: {
      type: String,
      default: 'checkbox'
    }
  }
});
</script>

<style lang="scss">
/* The container */
.field-input-container {
  display: block;
  cursor: pointer;
  width: auto;
  margin-top: calc((#{$field-height} - #{$checkbox-size}) / 2);
  height: $checkbox-size;
  position: relative;

  /* Hide the browser's default checkbox */
  .field-input-checkbox {
    display: none;
  }

  /* Create a custom checkbox */
  .field-checkbox {
    display: inline-block;
    height: $checkbox-size;
    width: $checkbox-size;
    background-color: #eee;
    font-size: $checkbox-size;
    font-weight: 600;
    color: white;
    padding: $checkbox-padding;
  }

  /* On mouse-over, add a grey background color */
  .field-input-checkbox:hover ~ .field-checkbox {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .field-input-checkbox:checked ~ .field-checkbox {
    background-color: #2196F3;
  }

  /* Show the checkmark when checked */
  .field-input-checkbox:checked ~ .field-checkbox::before {
    content: "\2714";
  }

  /* Style the checkmark/indicator */
  .field-checkbox::before {
    content: "";
    display: inline-block;
    position: absolute;
    line-height: 100%;
    top: 0;
  }
}
</style>
