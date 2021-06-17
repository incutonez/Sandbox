<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :border="false"
                 :class="fieldContainerCls">
    <FlexContainer v-if="showLabel"
                   class="field-label"
                   cmp="label"
                   :width="labelWidth"
                   :border="false"
                   :align="FlexAlignments.CENTER">
      {{ label }}{{ labelSeparator }}
    </FlexContainer>
    <input v-model="value"
           :class="fieldInputCls"
           :type="type"
           :required="isRequired"
           :disabled="isDisabled"
           :readonly="isReadOnly"
           :style="fieldInputStyle"
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

type ElementAttribute = boolean | null;
type ValueAttribute = string | boolean | null;

interface IData extends IEventsInjector, IRegisterInjector {
  isField: boolean;
  originalValue: string | boolean;
}

export default defineComponent({
  name: 'JefField',
  components: {FlexContainer},
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
    },
    labelWidth: {
      type: [Number, String],
      default: 100
    },
    inputWidth: {
      type: [Number, String],
      default: '100%'
    }
  },
  emits: [
    'update:modelValue',
    'press:enter'
  ],
  data(): IData {
    return {
      isField: true,
      originalValue: this.modelValue
    };
  },
  computed: {
    // Taken from https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
    value: {
      get(): ValueAttribute {
        return this.modelValue;
      },
      set(value: ValueAttribute) {
        this.$emit('update:modelValue', value ? value : this.emptyValueAsNull ? null : value);
      }
    },
    isReadOnly(): ElementAttribute {
      return this.readOnly || null;
    },
    isRequired(): ElementAttribute {
      return this.required || null;
    },
    isDisabled(): ElementAttribute {
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
      return cls.join(' ');
    },
    isVerticalLayout(): boolean {
      return [FlexDirections.ROW, FlexDirections.ROW_REVERSE].indexOf(this.layout) === -1;
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

  &.field-layout-horizontal {
    .field-label {
      padding: 0 $field-label-right-padding 0 $field-label-left-padding;
    }

    .field-input {
      margin-right: $field-label-left-padding;
    }
  }

  &.field-layout-vertical {
    .field-label {
      padding: $field-label-top-padding 0 $field-label-bottom-padding 0;
    }
  }

  .field-label {
    font-size: $field-label-font-size;
    color: $field-label-font-color;
    text-transform: $field-label-text-transform;
    font-weight: $field-label-font-weight;
    height: $field-height;
  }
}
</style>
