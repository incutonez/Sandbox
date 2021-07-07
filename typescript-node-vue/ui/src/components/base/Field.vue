<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :class="fieldContainerCls">
    <span v-if="showLabel"
          class="field-label"
          :style="labelStyle">
      {{ label }}{{ labelSeparator }}
    </span>
    <input v-model="value"
           ref="input"
           :class="fieldInputCls"
           :type="type"
           :required="isRequired"
           :disabled="isDisabled"
           :readonly="isReadOnly"
           :style="fieldInputStyle"
           :min="min"
           :max="max"
           @keyup.enter="onKeyUpField">
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexDirections} from '@/statics/Flex';
import RegisterInjector, {IRegisterInjector} from '@/mixins/RegisterInjector';
import EventsInjector, {IEventsInjector} from '@/mixins/EventsInjector';
import utilities from '@/utilities';
import {IElementAttribute, IFieldValue} from '@/interfaces/Components';

interface IData extends IEventsInjector, IRegisterInjector {
  isField: boolean;
  originalValue: IFieldValue;
  valid: boolean;
}

export default defineComponent({
  name: 'JefField',
  components: {
    FlexContainer
  },
  extends: FlexContainer,
  mixins: [
    RegisterInjector,
    EventsInjector
  ],
  props: {
    layout: {
      type: String as PropType<FlexDirections>,
      default: FlexDirections.ROW
    },
    type: {
      type: String,
      default: 'text'
    },
    /**
     * @property
     * If this is set to true, then any falsey value will be set to null instead of the actual value...
     * e.g.
     * - "" becomes null
     * - false becomes null
     */
    emptyValueAsNull: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: [String, Number, Boolean, Array],
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
    },
    labelWidth: {
      type: [Number, String],
      default: 100
    },
    inputWidth: {
      type: [Number, String],
      default: '100%'
    },
    min: {
      type: [Number, String],
      default: null
    },
    max: {
      type: [Number, String],
      default: null
    }
  },
  emits: [
    'update:modelValue',
    'press:enter'
  ],
  data(): IData {
    return {
      isField: true,
      originalValue: this.modelValue,
      valid: true
    };
  },
  computed: {
    labelStyle(): string {
      let labelWidth = this.isVerticalLayout ? '100%' : this.labelWidth;
      labelWidth = utilities.convertToPx(labelWidth);
      return `min-width: ${labelWidth}; max-width: ${labelWidth};`;
    },
    // Taken from https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
    value: {
      get(): IFieldValue {
        return this.modelValue;
      },
      set(value: IFieldValue) {
        this.isValid();
        this.$emit('update:modelValue', utilities.isEmpty(value) && this.emptyValueAsNull ? null : value);
      }
    },
    isReadOnly(): IElementAttribute {
      return this.readOnly || null;
    },
    isRequired(): IElementAttribute {
      return this.required || null;
    },
    isDisabled(): IElementAttribute {
      return this.disabled || null;
    },
    fieldInputStyle(): string {
      let width = this.inputWidth;
      if (width) {
        width = `width: ${utilities.convertToPx(width)};`;
      }
      return `${width}`;
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
      if (!this.valid) {
        cls.push('field-invalid');
      }
      return cls.join(' ');
    },
    isVerticalLayout(): boolean {
      return !utilities.contains([FlexDirections.ROW, FlexDirections.ROW_REVERSE], this.layout);
    },
    fieldContainerCls(): string {
      const cls = ['field-container', this.isVerticalLayout ? 'field-layout-vertical' : 'field-layout-horizontal'];
      return cls.join(' ');
    },
    showLabel(): boolean {
      return !!this.label;
    }
  },
  methods: {
    reset() {
      this.value = this.originalValue;
    },
    isValid(): boolean {
      const input = this.$refs.input as HTMLInputElement;
      this.valid = !input || input.validity.valid;
      return this.valid;
    },
    clear() {
      this.value = null;
    },
    onKeyUpField() {
      // If we have an eventBus, then we're in a form, so let's use that instead
      if (this.eventBus) {
        this.eventBus.emit('press:enter', this);
      }
      else {
        this.$emit('press:enter', this);
      }
    }
  },
  mounted() {
    this.isValid();
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
    width: 100%;
  }

  .field-label {
    font-size: $field-label-font-size;
    color: $field-label-font-color;
    text-transform: $field-label-text-transform;
    font-weight: $field-label-font-weight;
    line-height: $field-height;
    @include ellipsize();
  }

  &.field-layout-horizontal {
    .field-label {
      padding: 0 $field-label-padding-right 0 $field-label-padding-left;
    }

    .field-input {
      margin-right: $field-label-padding-left;
    }
  }

  &.field-layout-vertical {
    .field-label {
      padding: $field-label-padding-top 0 $field-label-padding-bottom 0;
      line-height: $field-height - $field-label-padding-top - $field-label-padding-bottom;
    }
  }
}
</style>
