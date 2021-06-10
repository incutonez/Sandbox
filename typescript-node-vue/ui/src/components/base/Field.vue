<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :border="false"
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
    <input v-model="value"
           :class="fieldInputCls"
           :type="type"
           :required="isRequired"
           :disabled="isDisabled"
           :readonly="isReadOnly">
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections} from '@/statics/Flex';

type FieldAttr = boolean | null;

export default defineComponent({
  name: 'JefField',
  components: {FlexContainer},
  extends: FlexContainer,
  props: {
    layout: {
      type: String as PropType<FlexDirections>,
      default: FlexDirections.ROW
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: [String, Boolean],
      default: ''
    },
    label: {
      type: [String, Boolean],
      default: false
    },
    labelSeparator: {
      type: String,
      default: ':'
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      FlexAlignments: FlexAlignments
    };
  },
  // TODO: Set a fixed width for the label
  // TODO: Style checkboxes/radios https://dev.to/kallmanation/styling-a-checkbox-with-only-css-3o3p
  //  See also: https://stackoverflow.com/a/4148544/1253609
  computed: {
    // Taken from https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
    value: {
      get(): string | boolean {
        return this.modelValue;
      },
      set(value: string | boolean) {
        this.$emit('update:modelValue', value);
      }
    },
    isReadOnly(): FieldAttr {
      return this.readOnly || null;
    },
    isRequired(): FieldAttr {
      return this.required || null;
    },
    isDisabled(): FieldAttr {
      return this.disabled || null;
    },
    fieldInputCls() {
      const cls = ['field-input'];
      if (this.required && !this.value) {
        cls.push('field-required');
      }
      if (this.readOnly) {
        cls.push('field-read-only');
      }
      if (this.disabled) {
        cls.push('field-disabled');
      }
      return cls.join(' ');
    },
    fieldLabelCls() {
      const cls = ['field-label'];
      // We're in a vertical layout
      if ([FlexDirections.ROW, FlexDirections.ROW_REVERSE].indexOf(this.layout) === -1) {
        cls.push('field-label-vertical');
      }
      // Horizontal
      else {
        cls.push('field-label-horizontal');
      }
      return cls.join(' ');
    },
    showLabel(): boolean {
      return !!this.label;
    }
  }
});
</script>

<style lang="scss">
.field-container {
  margin: $field-margin-top $field-margin-right $field-margin-bottom $field-margin-left;
  flex-basis: $field-height !important;

  .field-input {
    height: $field-height;
    font-size: $field-input-font-size;
    color: $field-input-font-color;
  }

  .field-label {
    font-size: $field-label-font-size;
    color: $field-label-font-color;
    text-transform: $field-label-text-transform;
    font-weight: $field-label-font-weight;

    &.field-label-horizontal {
      padding: 0 $field-label-right-padding 0 $field-label-left-padding;
    }

    &.field-label-vertical {
      padding: $field-label-top-padding 0 $field-label-bottom-padding 0;
    }
  }
}
</style>
