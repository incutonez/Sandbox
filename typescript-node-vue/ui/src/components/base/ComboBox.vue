<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :class="fieldContainerCls">
    <span v-if="showLabel"
          class="field-label"
          :style="labelStyle">
      {{ label }}{{ labelSeparator }}
    </span>
    <FlexContainer :direction="FlexDirections.COLUMN"
                   :grow="1">
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
      <Icon class="field-picker"
            :icon-name="Icons.CHEVRON_DOWN"
            @click="onClickPicker" />
      <JefList :store="store"
               :display-key="displayKey"
               :value-key="valueKey"
               :expanded="isExpanded"
               :align-target="alignTarget"
               :selected-record="record"
               @select="onSelectRecord" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {IRegisterInjector} from '@/mixins/RegisterInjector';
import {IEventsInjector} from '@/mixins/EventsInjector';
import Field from '@/components/base/Field.vue';
import IStore from '@/interfaces/IStore';
import IModel from '@/interfaces/IModel';
import Icon from '@/components/Icon.vue';
import JefList from '@/components/base/List.vue';
import {IEventMouse, IJefList, IValueAttribute} from '@/interfaces/Components';
import utilities from '@/utilities';

interface IData extends IEventsInjector, IRegisterInjector {
  isField: boolean;
  originalValue: string | number | boolean;
  valid: boolean;
}

export default defineComponent({
  name: 'ComboBox',
  components: {
    JefList,
    Icon,
    FlexContainer
  },
  extends: Field,
  props: {
    displayKey: {
      type: String,
      default: 'Description'
    },
    valueKey: {
      type: String,
      default: 'Value'
    },
    store: {
      type: Object as PropType<IStore<IModel>>,
      default: null
    }
  },

  data(): {
    isExpanded: boolean;
    alignTarget: HTMLElement | null;
  } {
    return {
      isExpanded: false,
      alignTarget: null
    };
  },

  computed: {
    record(): IModel | undefined {
      const store = this.store;
      return store && store.findRecord(this.valueKey, this.modelValue);
    },
    value: {
      get(): IValueAttribute | undefined {
        const record = this.record;
        return record && record.get(this.displayKey);
      },
      set(value: IValueAttribute) {
        this.isValid();
        this.$emit('update:modelValue', utilities.isEmpty(value) && this.emptyValueAsNull ? null : value);
      }
    }
  },

  methods: {
    onClickPicker(event: IEventMouse) {
      this.isExpanded = !this.isExpanded;
    },
    onSelectRecord(list: IJefList, record: IModel) {
      // TODO: Maybe a little redundant, as I can set the record here?
      this.value = record.get(this.valueKey);
      this.isExpanded = false;
    },
    onClickDocument(event: MouseEvent) {
      if (this.isExpanded && !this.$el.contains(event.target)) {
        this.isExpanded = false;
      }
    }
  },

  mounted() {
    this.alignTarget = this.$refs.input as HTMLElement;
    /* Let's listen for any document clicks, as we'll need to collapse if user clicks on something
     * outside of this class */
    document.addEventListener('click', this.onClickDocument);
  },

  unmounted() {
    document.removeEventListener('click', this.onClickDocument);
  }
});
</script>

<style lang="scss">
.field-container {
  .highlighted {
    background-color: lightblue;
  }

  .field-input {
    padding-right: 20px;
  }

  .field-picker {
    position: absolute;
    right: 5px;
    font-size: 14px;
    line-height: $field-height;

    &:hover {
      cursor: pointer;
      color: Highlight;
    }
  }
}
</style>
